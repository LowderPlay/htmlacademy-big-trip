import EventsView from '../view/events-view';
import InfoView from '../view/info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {render, RenderPosition} from '../framework/render';

export class PagePresenter {
  #eventsModel;
  #offersModel;
  #destinationsModel;
  #events;

  constructor({eventsModel, offersModel, destinationsModel}) {
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.getEvents()];
    this.#renderInfo();
    this.#renderFilter();
    this.#renderSort();

    const eventsView = new EventsView();
    this.#renderEvents(eventsView);
    this.#renderEventForms(eventsView);
  }

  #renderInfo() {
    const infoView = new InfoView(
      'Amsterdam &mdash; Chamonix &mdash; Geneva',
      '18&nbsp;&mdash;&nbsp;20 Mar',
      1230
    );

    render(infoView, document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filterView = new FilterView('everything');

    render(filterView, document.querySelector('.trip-controls__filters'));
  }

  #renderSort() {
    const sortView = new SortView('day');

    render(sortView, document.querySelector('.trip-events'));
  }

  #renderEvents(eventsView) {
    for (const event of this.#events) {
      const eventView = new EventView(
        event,
        event.offers.map((id) => this.#offersModel.getById(id)),
        this.#destinationsModel.getById(event.destination)
      );
      render(eventView, eventsView.element);
    }
  }

  #renderEventForms(eventsView) {
    // const event = this.#events[0];
    // const editEventView = new EditEventView(
    //   this.#offersModel.getByType(event.type),
    //   this.#destinationsModel.getById(event.destination),
    //   event
    // );
    // render(editEventView, eventsView.element, RenderPosition.AFTERBEGIN);

    // const newEventView = new EditEventView(
    //   this.#offersModel.getByType('taxi'),
    //   this.#destinationsModel.getDestinations()[0]
    // );
    // render(newEventView, eventsView.element);
    //
    render(eventsView, document.querySelector('.trip-events'));
  }
}
