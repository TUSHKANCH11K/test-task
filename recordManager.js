class RecordManager {
    constructor() {
      this.recordsKey = 'records';
      this.records = this.loadRecords();
    }
  
    // Загрузка записей из localStorage
    loadRecords() {
      const records = localStorage.getItem(this.recordsKey);
      return records ? JSON.parse(records) : [];
    }
  
    // Сохранение записей в localStorage
    saveRecords() {
      localStorage.setItem(this.recordsKey, JSON.stringify(this.records));
    }
  
    // Добавление новой записи
    addRecord(title, description) {
      const now = new Date();
      const newRecord = {
        id: this.generateId(),
        title: title,
        description: description,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        completed: false
      };
      this.records.push(newRecord);
      this.saveRecords();
    }
  
    // Удаление записи по ID
    deleteRecord(id) {
      this.records = this.records.filter(record => record.id !== id);
      this.saveRecords();
    }
  
    // Получение списка всех записей
    getAllRecords() {
      return this.records;
    }
  
    // Получение одной записи по ID
    getRecordById(id) {
      return this.records.find(record => record.id === id);
    }
  
    // Изменение записи по ID
    updateRecord(id, updatedFields) {
      const record = this.getRecordById(id);
      if (record) {
        Object.assign(record, updatedFields);
        record.updatedAt = new Date().toISOString();
        this.saveRecords();
      }
    }
  
    // Генерация уникального ID для записи
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }
  
  // Пример использования
  const recordManager = new RecordManager();
  recordManager.addRecord('Заголовок 1', 'Описание 1');
  recordManager.addRecord('Заголовок 2', 'Описание 2');
  
  console.log(recordManager.getAllRecords());
  console.log(recordManager.getRecordById(recordManager.records[0].id));
  
  recordManager.updateRecord(recordManager.records[0].id, { title: 'Обновленный заголовок 1' });
  console.log(recordManager.getAllRecords());
  
  recordManager.deleteRecord(recordManager.records[1].id);
  console.log(recordManager.getAllRecords());
  