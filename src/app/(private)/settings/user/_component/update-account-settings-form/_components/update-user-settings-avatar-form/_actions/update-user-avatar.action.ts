'use client';

import { createClient } from '~aspire/external/supabase';
import { ErrorUtils } from '~aspire/shared/utils';

export interface UpdateUserAvatarHandlerInput {
  avatar: File | null;
}

export const uploadUserAvatarHandler = async ({
  avatar,
}: UpdateUserAvatarHandlerInput) => {
  try {
    const supabase = await createClient();

    if (!avatar) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: null,
        },
      });

      if (updateError) {
        throw updateError;
      }

      return { success: true };
    }

    const fileName = `${Date.now()}-${avatar.name}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('users_avatars')
      .upload(filePath, avatar);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = await supabase.storage
      .from('users_avatars')
      .getPublicUrl(filePath);

    if (!publicUrlData.publicUrl) {
      throw new Error('Failed to generate public URL for avatar.');
    }
    // Update user metadata with the avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatar_url: publicUrlData.publicUrl,
      },
    });

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
