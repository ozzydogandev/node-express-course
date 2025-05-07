const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
      queryObject.featured = featured === 'true';
    }

    if (company) {
      queryObject.company = new RegExp(`^${company}$`, 'i');
    }

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    if (numericFilters) {
      const operatorsMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorsMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters.split(',').forEach((filter) => {
        const [field, operator, value] = filter.split('-');
        if (options.includes(field)) {
          if (!queryObject[field]) queryObject[field] = {};
          queryObject[field][operator] = Number(value);
        }
      });
    }

    let result = Product.find(queryObject);

    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProductsStatic = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
  createProduct
};
