'use strict';

module.exports = function(sequelize, DataTypes) {
  var edition = sequelize.define('edition', {
    publication_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    pdf: DataTypes.STRING,
    edition_number: DataTypes.STRING,
    notes: DataTypes.TEXT,
    text_content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        edition.belongsTo(models.publication, { foreignKey: 'publication_id'});
      }
    }
  });
  return edition;
};