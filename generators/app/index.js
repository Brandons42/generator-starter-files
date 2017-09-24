'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {

    super(args, opts);

    this.option('bower', {
      alias: 'b',
      default: false,
      desc: 'Use Bower for dependency management',
      type: String
    });

    this.option('npm', {
      alias: 'n',
      default: false,
      desc: 'Use NPM for dependency management',
      type: String
    });

    this.option('yarn', {
      alias: 'y',
      default: true,
      desc: 'Use Yarn for dependency management',
      type: String
    });

  }

  initializing() {

    this.composeWith(require.resolve('generator-gitattributes/generators/app'));

  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-starter-files') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    let ignored;
    if ((bower && yarn) || (bower && npm)) {
      ignored = "bower_components\nnode_modules";
    }
    else if (yarn || npm) {
      ignored = "node_modules";
    }
    else if (bower) {
      ignored = "bower_components";
    }

    this.fs.copy(
      this.templatePath('*'),
      this.destinationPath('./'), {
        ignored: ignored
    });

  }

  install() {
    this.installDependencies({
      bower: this.options.bower,
      npm: this.options.npm,
      yarn: this.options.yarn
    });
  }
};
