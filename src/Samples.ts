import { IncomingWebhook, IncomingWebhookSendArguments } from './IncomingWebhook';

const url = '';
/**
 * シンプルなテキストの送信
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-underscore-dangle
function sendSimpleText_() {
  const webhook = new IncomingWebhook(url);
  webhook.send('test');
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-underscore-dangle
function sendMessageWithOpts_() {
  const message: IncomingWebhookSendArguments = {
    channel: 'general',
    icon_emoji: ':ok:', // eslint-disable-line @typescript-eslint/camelcase
    username: 'Webhook for GAS',
    text: 'send Message With Opts',
  };
  const webhook = new IncomingWebhook(url);
  webhook.send(message);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-underscore-dangle
function sendComplexMessage_() {
  const message: IncomingWebhookSendArguments = {
    text: 'Robert DeSoto added a new task',
    attachments: [
      {
        fallback: 'Plan a vacation',
        author_name: 'Owner: rdesoto', // eslint-disable-line @typescript-eslint/camelcase
        title: 'Plan a vacation',
        text: "I've been working too hard, it's time for a break.",
        actions: [
          {
            name: 'action',
            type: 'button',
            text: 'Complete this task',
            style: 'default',
            value: 'complete',
          },
          {
            name: 'tags_list',
            type: 'select',
            text: 'Add a tag...',
            data_source: 'static', // eslint-disable-line @typescript-eslint/camelcase
            options: [
              {
                text: 'Launch Blocking',
                value: 'launch-blocking',
              },
              {
                text: 'Enhancement',
                value: 'enhancement',
              },
              {
                text: 'Bug',
                value: 'bug',
              },
            ],
          },
        ],
      },
    ],
  };
  const webhook = new IncomingWebhook(url);
  webhook.send(message);
}
