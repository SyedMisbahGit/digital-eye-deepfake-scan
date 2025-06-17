
import { pipeline, env, AutoTokenizer, AutoModel } from '@huggingface/transformers';

// Configure for local model storage
env.allowLocalModels = true;
env.allowRemoteModels = true;

interface ModelCache {
  [key: string]: any;
}

class AIModelManager {
  private static instance: AIModelManager;
  private modelCache: ModelCache = {};
  private loadingPromises: { [key: string]: Promise<any> } = {};

  static getInstance(): AIModelManager {
    if (!AIModelManager.instance) {
      AIModelManager.instance = new AIModelManager();
    }
    return AIModelManager.instance;
  }

  async loadDeepfakeDetectionModel() {
    const modelKey = 'deepfake-detection';
    
    if (this.modelCache[modelKey]) {
      return this.modelCache[modelKey];
    }

    if (this.loadingPromises[modelKey]) {
      return this.loadingPromises[modelKey];
    }

    this.loadingPromises[modelKey] = pipeline(
      'image-classification',
      'microsoft/resnet-50',
      { device: 'webgpu' }
    );

    try {
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU');
      this.loadingPromises[modelKey] = pipeline(
        'image-classification',
        'microsoft/resnet-50'
      );
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    }
  }

  async loadSentimentAnalysisModel() {
    const modelKey = 'sentiment-analysis';
    
    if (this.modelCache[modelKey]) {
      return this.modelCache[modelKey];
    }

    if (this.loadingPromises[modelKey]) {
      return this.loadingPromises[modelKey];
    }

    this.loadingPromises[modelKey] = pipeline(
      'sentiment-analysis',
      'cardiffnlp/twitter-roberta-base-sentiment-latest',
      { device: 'webgpu' }
    );

    try {
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    } catch (error) {
      console.warn('WebGPU not available for sentiment, falling back to CPU');
      this.loadingPromises[modelKey] = pipeline(
        'sentiment-analysis',
        'cardiffnlp/twitter-roberta-base-sentiment-latest'
      );
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    }
  }

  async loadTextClassificationModel() {
    const modelKey = 'text-classification';
    
    if (this.modelCache[modelKey]) {
      return this.modelCache[modelKey];
    }

    if (this.loadingPromises[modelKey]) {
      return this.loadingPromises[modelKey];
    }

    this.loadingPromises[modelKey] = pipeline(
      'text-classification',
      'unitary/toxic-bert',
      { device: 'webgpu' }
    );

    try {
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    } catch (error) {
      console.warn('WebGPU not available for text classification, falling back to CPU');
      this.loadingPromises[modelKey] = pipeline(
        'text-classification',
        'unitary/toxic-bert'
      );
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    }
  }

  async loadFeatureExtractionModel() {
    const modelKey = 'feature-extraction';
    
    if (this.modelCache[modelKey]) {
      return this.modelCache[modelKey];
    }

    if (this.loadingPromises[modelKey]) {
      return this.loadingPromises[modelKey];
    }

    this.loadingPromises[modelKey] = pipeline(
      'feature-extraction',
      'sentence-transformers/all-MiniLM-L6-v2',
      { device: 'webgpu' }
    );

    try {
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    } catch (error) {
      console.warn('WebGPU not available for feature extraction, falling back to CPU');
      this.loadingPromises[modelKey] = pipeline(
        'feature-extraction',
        'sentence-transformers/all-MiniLM-L6-v2'
      );
      this.modelCache[modelKey] = await this.loadingPromises[modelKey];
      return this.modelCache[modelKey];
    }
  }

  async clearCache() {
    this.modelCache = {};
    this.loadingPromises = {};
  }
}

export default AIModelManager;
