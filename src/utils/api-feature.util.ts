import { Document, Query } from "mongoose";

interface QueryObject {
  [key: string]: string;
}

class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryObject: QueryObject;

  constructor(data: Query<T[], T>, queryObject: QueryObject) {
    this.query = data;
    this.queryObject = queryObject;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count(customFilter: any) {
    const queryObj = { ...this.queryObject, ...customFilter }; // shallow copy
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.queryObject = { ...customFilter, ...queryObj };

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter(customFilter: any) {
    const queryObj = { ...this.queryObject, ...customFilter }; // shallow copy
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = +this.queryObject.page * 1;
    const limit =
      +this.queryObject.limit === 0 ? 0 : +this.queryObject.limit * 1;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
