const DEFAULT_MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

function stripDataUrl(dataUrl) {
  if (!dataUrl) return '';
  const [, base64] = dataUrl.split(',');
  return base64 ?? dataUrl;
}

export class GeminiClient {
  constructor({ apiKey = '', logger }) {
    this.apiKey = apiKey;
    this.logger = logger;
    this.model = DEFAULT_MODEL;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  getApiKey() {
    return this.apiKey;
  }

  hasApiKey() {
    return Boolean(this.apiKey);
  }

  setModel(model) {
    this.model = model;
  }

  async request(url, options) {
    let response;
    try {
      response = await fetch(url, options);
    } catch (error) {
      if (error?.name === 'AbortError' || options.signal?.aborted) {
        throw new DOMException('Analysis cancelled.', 'AbortError');
      }
      throw new Error('Unable to reach Gemini. Check your connection and try again.');
    }
    if (!response.ok) {
      const hints = {
        400: 'Check the request and selected model.',
        401: 'Check your API key.',
        403: 'Check your API key and account permissions.',
        404: 'The configured model may no longer be available.',
        429: 'Quota or rate limit reached. Check your Google account before retrying.',
      };
      const message = `Gemini request failed (HTTP ${response.status}). ${hints[response.status] ?? 'Try again later.'}`;
      this.logger?.log(message, 'error');
      throw new Error(message);
    }
    try {
      return await response.json();
    } catch (error) {
      if (error?.name === 'AbortError' || options.signal?.aborted) {
        throw new DOMException('Analysis cancelled.', 'AbortError');
      }
      throw new Error('Gemini returned an unreadable response. Try again later.');
    }
  }

  async analyzeFrame({ base64Image, prompt, abortSignal }) {
    if (!this.apiKey) {
      throw new Error('Missing Gemini API key');
    }

    const url = `${BASE_URL}/${this.model}:generateContent`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: stripDataUrl(base64Image),
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
      },
    };

    this.logger?.log('Sending frame to Gemini API');

    const response = await this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey,
      },
      body: JSON.stringify(payload),
      signal: abortSignal,
    });

    const data = response;
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n') ?? '';

    return {
      text,
      raw: data,
    };
  }

  async generateText({ prompt, abortSignal, temperature = 0.4 }) {
    if (!this.apiKey) {
      throw new Error('Missing Gemini API key');
    }

    const url = `${BASE_URL}/${this.model}:generateContent`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
      },
    };

    const response = await this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey,
      },
      body: JSON.stringify(payload),
      signal: abortSignal,
    });

    const data = response;
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n') ?? '';

    return {
      text,
      raw: data,
    };
  }
}
