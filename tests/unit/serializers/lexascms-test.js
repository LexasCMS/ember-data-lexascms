import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | lexascms', function(hooks) {
  setupTest(hooks);

  test('keyForAttribute doesn\'t transform the attribute name', function(assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('lexascms');

    assert.equal(serializer.keyForAttribute('attributeName'), 'attributeName');
    assert.equal(serializer.keyForAttribute('attribute-name'), 'attribute-name');
    assert.equal(serializer.keyForAttribute('attribute_name'), 'attribute_name');
  });
  
  test('keyForRelationship doesn\'t transform the relationship name', function(assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('lexascms');

    assert.equal(serializer.keyForRelationship('relationshipName'), 'relationshipName');
    assert.equal(serializer.keyForRelationship('relationship-name'), 'relationship-name');
    assert.equal(serializer.keyForRelationship('relationship_name'), 'relationship_name');
  });
});
