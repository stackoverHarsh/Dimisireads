import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';
import { DigitalInventoryService } from '@/services/digital-inventory.service';
import { HighlightColor } from '@prisma/client';

const createAnnotationSchema = z.object({
  type: z.enum(['bookmark', 'highlight']),
  bookId: z.string().min(1),
  cfiLocation: z.string().optional(),
  label: z.string().optional(),
  cfiRange: z.string().optional(),
  selectedText: z.string().optional(),
  color: z.nativeEnum(HighlightColor).optional(),
  noteContent: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const { slug } = await params;
    const annotations = await DigitalInventoryService.getAnnotations(user.id, slug);

    return apiSuccess({ annotations });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const body = await validateBody(req, createAnnotationSchema);

    if (body.type === 'bookmark') {
      const bookmark = await DigitalInventoryService.addBookmark(
        user.id,
        body.bookId,
        body.cfiLocation || 'p-1',
        body.label
      );
      return apiSuccess({ bookmark, message: 'Bookmark ribbon placed' }, undefined, 201);
    } else {
      const highlight = await DigitalInventoryService.addHighlight(
        user.id,
        body.bookId,
        body.cfiRange || 'range-1',
        body.selectedText || '',
        body.color || HighlightColor.AMBER_GOLD,
        body.noteContent
      );
      return apiSuccess({ highlight, message: 'Highlight and note preserved' }, undefined, 201);
    }
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return apiSuccess({ message: 'Missing id or type parameters' });
    }

    if (type === 'bookmark') {
      await DigitalInventoryService.removeBookmark(user.id, id);
    } else {
      await DigitalInventoryService.removeHighlight(user.id, id);
    }

    return apiSuccess({ message: 'Annotation removed' });
  } catch (error) {
    return handleApiError(error);
  }
}
