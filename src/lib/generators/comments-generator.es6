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
      this.getPrivateFunctionTemplate()
    );
    Mustache.parse(
      this.getPublicFunctionTemplate()
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
      case ContractParts.PRIVATE_FUNCTION: {
        return this.generateComment(
          this.getPrivateFunctionTemplate(),
          item
        );
      }
      case ContractParts.PUBLIC_FUNCTION: {
        return this.generateComment(
          this.getPublicFunctionTemplate(),
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

  getPublicFunctionTemplate() {
    return this.getTemplate('../../spec/public_function.mustache');
  }

  getPrivateFunctionTemplate() {
    return this.getTemplate('../../spec/private_function.mustache');
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

}
