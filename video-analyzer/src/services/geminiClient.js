const DEFAULT_MODEL = 'gemini-2.0-flash-exp';
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

  async analyzeFrame({ base64Image, prompt, abortSignal }) {
    if (!this.apiKey) {
      throw new Error('Missing Gemini API key');
    }

    const url = `${BASE_URL}/${this.model}:generateContent?key=${this.apiKey}`;
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

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: abortSignal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      this.logger?.log('Gemini API responded with error', 'error', errorBody);
      const message = errorBody.error?.message ?? response.statusText;
      throw new Error(`Gemini API error: ${message}`);
    }

    const data = await response.json();
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

    const url = `${BASE_URL}/${this.model}:generateContent?key=${this.apiKey}`;
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

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: abortSignal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      this.logger?.log('Gemini summary error', 'error', errorBody);
      const message = errorBody.error?.message ?? response.statusText;
      throw new Error(`Gemini API error: ${message}`);
    }

    const data = await response.json();
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
