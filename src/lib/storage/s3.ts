import crypto from 'crypto';
import { env } from '@/lib/env';

export interface SignedUrlOptions {
  expiresInSeconds?: number;
  action?: 'read' | 'download';
  filename?: string;
  contentType?: string;
}

export class S3StorageClient {
  private static readonly SECRET = env.JWT_SECRET || 'dimisireads_secure_storage_secret_key_2026';

  /**
   * Generate a cryptographically signed, short-lived time-limited URL for secure streaming or downloading
   */
  static generateSignedUrl(
    storageKey: string,
    bookId: string,
    userId: string,
    options: SignedUrlOptions = {}
  ): { url: string; expiresAt: Date; expiresInSeconds: number } {
    const expiresInSeconds = options.expiresInSeconds || 600; // 10 minutes default
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    const expiresTimestamp = Math.floor(expiresAt.getTime() / 1000);

    const action = options.action || 'read';
    const filename = options.filename || 'dimisireads-book.epub';

    // Construct signature payload
    const payload = `${storageKey}:${bookId}:${userId}:${action}:${expiresTimestamp}`;
    const hmac = crypto.createHmac('sha256', this.SECRET);
    hmac.update(payload);
    const signature = hmac.digest('hex');

    // Secure token encapsulating access constraints
    const tokenData = {
      k: storageKey,
      b: bookId,
      u: userId,
      a: action,
      f: filename,
      exp: expiresTimestamp,
      sig: signature,
    };

    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64url');
    const baseUrl = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/downloads/stream/${token}`;

    return {
      url,
      expiresAt,
      expiresInSeconds,
    };
  }

  /**
   * Verify an incoming signed token before streaming or serving binary content
   */
  static verifySignedToken(token: string): {
    valid: boolean;
    storageKey?: string;
    bookId?: string;
    userId?: string;
    action?: 'read' | 'download';
    filename?: string;
    error?: string;
  } {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
      const { k, b, u, a, f, exp, sig } = decoded;

      // Check timestamp expiration
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (nowSeconds > exp) {
        return { valid: false, error: 'Signed digital access URL has expired. Please generate a new access link.' };
      }

      // Verify HMAC cryptographic signature
      const expectedPayload = `${k}:${b}:${u}:${a}:${exp}`;
      const hmac = crypto.createHmac('sha256', this.SECRET);
      hmac.update(expectedPayload);
      const expectedSignature = hmac.digest('hex');

      if (sig !== expectedSignature) {
        return { valid: false, error: 'Invalid cryptographic signature on digital asset URL.' };
      }

      return {
        valid: true,
        storageKey: k,
        bookId: b,
        userId: u,
        action: a,
        filename: f,
      };
    } catch {
      return { valid: false, error: 'Malformed access token.' };
    }
  }
}
