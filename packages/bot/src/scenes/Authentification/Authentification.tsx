import React, { useEffect } from 'react';
import { Text, useBotContext } from '@urban-bot/core';
import { useTranslation } from '@common_ubot/i18n';
import { useUserQuery } from '@common_ubot/api-client';

interface AuthenticationProps {
  isSuccess: () => void;
  isFailed: () => void;
}

export const Authentification = ({ isSuccess, isFailed }: AuthenticationProps) => {
  const { t } = useTranslation();
  const { chat } = useBotContext();
  const { data, loading } = useUserQuery({ variables: { id: chat.id } });

  useEffect(() => {
    if (!loading && !data?.user) isFailed();
    if (!loading && data?.user) setTimeout(() => isSuccess(), 1000);
  }, [data]);

  if (!loading && data?.user) return <Text>{t('greeting')}</Text>;
  return null;
};
