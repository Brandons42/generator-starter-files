'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {

    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-starter-files') + ' generator!'
    ));

  }

  writing() {

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore')
    );

    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('./.gitattributes')
    );

  }

};
