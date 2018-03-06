import {observable, action, computed} from 'mobx';

class NotesStore {
	@observable Author = null;
	@observable Date = null;
	@observable Description = null;
	@observable Id = null;
	@observable Note = null;
	@observable Title = null;
	@observable _id = null;

	@action setParams = (data) => {
		Object.assign(this, data);
	}

	@computed get data() {
		if (!this._id) return false;
		return this;
	}
}

export const notesStore = new NotesStore();
