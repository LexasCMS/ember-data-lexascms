import Model, { attr } from '@ember-data/model';

export default class LexascmsCoreImageModel extends Model {

  @attr assetId;
  @attr fileSize;
  @attr fileName;
  @attr width;
  @attr height;
  @attr altText;
  @attr format;
  @attr mimeType;
  @attr url;

}