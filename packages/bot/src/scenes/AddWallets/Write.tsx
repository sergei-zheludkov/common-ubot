import React, { useEffect } from 'react';
import { Button, ButtonGroup, Text, useText } from '@urban-bot/core';
import { useAddWalletsMutation } from '@common_ubot/api-client';
import { useTranslation } from '@common_ubot/i18n';

import { AddWalletData } from './types';

interface Props {
  data: AddWalletData[];
  exit: () => void;
}

const Write = ({ data, exit }: Props) => {
  const { t } = useTranslation(['wallets', 'buttons']);
  const [addWallets, { data: returnData }] = useAddWalletsMutation();

  useText(exit, t('buttons:great'));
  useText(exit, t('buttons:exit'));

  useEffect(() => {
    (async () => { await addWallets({ variables: { input: data } }); })();
  }, []);

  switch (returnData?.addWallets.status) {
    case 'success': {
      const successMessage = `${t('add_wallets_success')} ${data.length} шт`;
      return (
        <ButtonGroup isReplyButtons isResizedKeyboard title={successMessage}>
          <Button>{t('buttons:great')}</Button>
        </ButtonGroup>
      );
    }
    case 'failed':
      return (
        <ButtonGroup isReplyButtons isResizedKeyboard title={t('add_wallets_failed')}>
          <Button>{t('buttons:exit')}</Button>
        </ButtonGroup>
      );
    default:
      return <Text isRemoveKeyboard isNewMessageEveryRender={false}>{t('common:loading')}</Text>;
  }
};

export { Write };
