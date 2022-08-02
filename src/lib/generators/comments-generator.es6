import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import ContractParts from '../contract-parts.es6';

export default class CommentsGenerator {

  constructor() {
    Mustache.parse(
      this.getContractCommentTemplate()
    );
    Mustache.parse(
      this.getGlobalVariableTemplate()
    );
    Mustache.parse(
      this.getModifierTemplate()
    );
    Mustache.parse(
      this.getFunctionTemplate()
    );
  }


  generate(item) {
    switch (item.type) {
      case ContractParts.CONTRACT: {
        return this.generateComment(
          this.getContractCommentTemplate(),
          item
        );
      }
      case ContractParts.EVENT: {
        return '';
      }
      case ContractParts.GLOBAL_VARIABLE: {
        return this.generateComment(
          this.getGlobalVariableTemplate(),
          item
        );
      }
      case ContractParts.MODIFIER: {
        return this.generateComment(
          this.getModifierTemplate(),
          item
        );
      }
      case ContractParts.PRAGMA: {
        return '';
      }
      case ContractParts.FUNCTION: {
        item.params = this.extractParamNames(item);
        return this.generateComment(
          this.getFunctionTemplate(),
          item
        );
      }
      default: {
        return '';
      }
    }
  }

  generateComment(template, view) {
    return Mustache.render(template, view);
  }

  getTemplate(location) {
    return fs.readFileSync(
      path.resolve(__dirname, location),
      'utf-8'
    );
  }

  getFunctionTemplate() {
    return this.getTemplate('../../spec/function.mustache');
  }

  getModifierTemplate() {
    return this.getTemplate('../../spec/modifier.mustache');
  }

  getGlobalVariableTemplate() {
    return this.getTemplate('../../spec/global_variable.mustache');
  }

  getContractCommentTemplate() {
    return this.getTemplate('../../spec/contract.mustache');
  }

  extractParamNames(item) {
    const parameters = item.parameters.parameters ? item.parameters.parameters : item.parameters;
    return parameters.map((p) => ({name: p.name}));
  }
}
