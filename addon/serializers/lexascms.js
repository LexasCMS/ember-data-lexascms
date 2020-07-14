import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class LexascmsSerializer extends JSONAPISerializer {

  keyForAttribute(attributeName) {
    return attributeName;
  }

  keyForRelationship(relationshipName) {
    return relationshipName;
  }

}