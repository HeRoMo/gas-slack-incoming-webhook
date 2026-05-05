// GAS のグローバルスコープで @slack/types の型を利用可能にする
declare global {
  type MessageAttachment = import('@slack/types').MessageAttachment;
  type Block = import('@slack/types').Block;
  type KnownBlock = import('@slack/types').KnownBlock;
}

export {};