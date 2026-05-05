/**
 * A client for Slack's Incoming Webhooks
 */
class IncomingWebhook {
  // The webhook URL
  private url: string;

  private defaults: IncomingWebhookDefaultArguments;

  constructor(url: string, defaults: IncomingWebhookDefaultArguments = {}) {
    if (url === undefined) {
      throw new Error('Incoming webhook URL is required');
    }

    this.url = url;
    this.defaults = defaults;
  }

  /**
   * Send a notification to a conversation
   * @param message the message (a simple string, or an object describing the message)
   */
  public send(message: string | IncomingWebhookSendArguments): IncomingWebhookResult {
    let payload: IncomingWebhookSendArguments = { ...this.defaults };

    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = { ...payload, ...message };
    }

    const opts: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };
    const response = UrlFetchApp.fetch(this.url, opts);
    return { text: response.getContentText() };
  }
}

interface IncomingWebhookResult {
  text: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IncomingWebhookDefaultArguments {
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
  channel?: string;
  text?: string;
  link_names?: boolean;
}

interface IncomingWebhookSendArguments extends IncomingWebhookDefaultArguments {
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  unfurl_links?: boolean;
  unfurl_media?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createIncomingWebhook(url: string, defaults: IncomingWebhookDefaultArguments = {}) {
  return new IncomingWebhook(url, defaults);
}
/* eslint-enable @typescript-eslint/naming-convention */
