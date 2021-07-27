'use strict';

module.exports = function(sequelize, DataTypes) {
  var edition = sequelize.define('edition', {
    publication_id: DataTypes.INTEGER,
    edition_date: DataTypes.DATE,
    name: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    pdf: DataTypes.STRING,
    label: DataTypes.STRING,
    edition_number: DataTypes.STRING,
    notes: DataTypes.TEXT,
    text_content: DataTypes.TEXT
  }, {
  });

  edition.associate = (models) => {
    edition.hasMany(models.publication, { foreignKey: 'id', });
  };

  return edition;
};