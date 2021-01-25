'use strict';

module.exports = function(sequelize, DataTypes) {
  var publication = sequelize.define('publication', {
    name: DataTypes.STRING,
    about_excerpt: DataTypes.STRING,
    about: DataTypes.STRING
  }, {
    tableName: 'publications'
  });

  publication.associate = (models) => {
    publication.hasMany(models.edition, { foreignKey: 'publication_id', });
  };

  return publication;
};