import React, { Component } from 'react';
import TimerTaxonomyEdit from './TimerTaxonomyEdit';

class TimerCategoryEdit extends TimerTaxonomyEdit {
  render() {

    let checked = {};

    if ( this._timerHasTaxonomy() ) {
      checked = {checked: 'checked'};
    }

    return (
      <li>
        <label>
          <input type="checkbox"  className="checkbox"
            {...checked}
            onChange={this._handleCheck.bind(this)}
            ref={(input) => this._checkbox = input} />
          {this.props.taxonomy.name}
        </label>
      </li>
    );
  }

  _handleCheck(event){
    if (this._checkbox.checked) {

      // The addCategory method has been passed as an argument from TimerCategoriesEdit (see later!).
      this.props.addCategory(this.props.taxonomy);
      // console.log('checked');
    } else {

      // The removeCategory method has been passed as an argument from TimerCategoriesEdit (see later!).
      this.props.removeCategory(this.props.taxonomy);
      // console.log('unchecked');
    }
  }
}

export default TimerCategoryEdit;
