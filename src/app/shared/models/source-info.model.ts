export interface IFieldSource {
  id?: any,
  name?: string,
  type?: string,
  url?: string,
  listens?: number,
  status?: any,
  start_date?: string,
  end_date?: string,
  content?: []
}

export class FieldSource implements IFieldSource {
  constructor(
    public id?: any,
    public name?: string,
    public type?: string,
    public url?: string,
    public listens?: number,
    public status?: any,
    public start_date?: string,
    public end_date?: string,
    public content?: [],
  ) {
    this.id = id ? id : null;
    this.name = name ? name : '';
    this.type = type ? type : '';
    this.url = url ? url : '',
    this.listens = listens ? listens : undefined,
    this.status = status ? status : null,
    this.start_date = start_date ? start_date : '',
    this.end_date = end_date ? end_date : '',
    this.content = content ? content : []
  }
}
