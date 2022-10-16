import { utilService } from './util-service';
import { storageService } from './async-storage-service';

const KEY = 'moon_db';

export const localStorageService = {
  query,
  getById,
  remove,
  save,
};

const gDays = _createDays();

async function query(filterBy = {}) {
  return storageService.query(KEY);
}

async function getById(_id) {
  return storageService.getById(KEY, _id);
}

async function remove(_id) {
  return storageService.remove(KEY, _id);
}

async function save(entity) {
  console.log('local', entity)
  return entity._id ? storageService.put(KEY, entity) : storageService.post(KEY, entity);
}

function _createDays() {
  let days = utilService.loadFromStorage(KEY);
  if (!days || !days.length) {
    // days = _createFakeDays();
    days = _backupDays();
    utilService.saveToStorage(KEY, days);
  }
  return days;
}

function _backupDays() {
  return [
    
    ];
}
