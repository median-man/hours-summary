export class SheetListGroup {
  constructor({ onSheetSelected }) {
    this._onSheetSelected = onSheetSelected;
    this._selector = '#list-group-sheets';
    $(this._selector).on(
      'click',
      'button',
      this.createHandleItemClick(onSheetSelected)
    );
  }

  createHandleItemClick(onSheetSelected) {
    return function() {
      if ($(event.target).hasClass('web-view-link')) {
        // user did not make a selection
        return;
      }
      // `this` refers to the clicked element
      onSheetSelected && onSheetSelected($(this).attr('data-id'));
    };
  }

  show() {
    $(this._selector).fadeIn();
  }

  hide() {
    return new Promise((resolve, reject) => {
      try {
        $(this._selector).fadeOut(400, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  setSheets(sheetsData) {
    $(this._selector)
      .empty()
      .append(sheetsData.map(this.createSheetButton));
  }

  createSheetButton({ id, name, webViewLink, iconLink }) {
    const sheetIcon = $('<img>').attr({
      src: iconLink,
      'aria-hidden': 'true',
      class: 'mr-2',
    });
    const externalLinkIcon = $(
      '<i class="fas fa-external-link-alt" aria-hidden="true"></i>'
    );
    const viewSheetLink = $('<a>')
      .attr({
        class: 'web-view-link pl-2',
        href: webViewLink,
        'aria-label': 'Open sheet in new tab',
        target: '_blank',
      })
      .append(externalLinkIcon);

    return $('<button>')
      .addClass('list-group-item list-group-item-action h6')
      .append(sheetIcon, name, viewSheetLink)
      .attr({
        type: 'button',
        'data-id': id,
      });
  }
}
