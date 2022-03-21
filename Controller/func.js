import DataSc from "../Model/data.js"

const getAllData = async (req, res, next)=>
{
    try {
        const {name, featured, company, sort, fields, numericFilters} = req.query;
        const searchQ = {};
        
// search based on name, company or featured
        if(name)
        {
            searchQ.name = {$regex: name, $options: 'i'}
        }
        if(company)
        {
            searchQ.company = company;
        }
        if(featured)
        {
            searchQ.featured = featured;
        
        }

        let data = DataSc.find(searchQ);
///////////////////////////////////////////////////////

// search the database based on mathimatical operators, only the [price, rating] fields
        if(numericFilters)
        {
            const operators = {
                "<": "$gt",
                ">": "$lt",
                "<=": "$gte",
                ">=": "$lte",
                "=": "$eq",
			};

            const regEX = /\b(<|>|>=|=|<|<=)\b/g
            const options = ["price", "rate"]
            const filter = numericFilters.replace(regEX, (x)=>
            {
                return `-${operators[x]}-`
            })
            filter.split(",").forEach(e => {
                const [field, op, value] = e.split("-")

                if(options.includes(field))
                {
                    searchQ[field] = {[op]: value}
                }
                
            });
            data = DataSc.find({
                searchQ
            })

        }
////////////////////////////////////////////////////////
// select certain fields
        if (fields) {
            const fieldslist = fields.split(",").join(" ");
            data = data.select(fieldslist);
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * page;
        console.log(limit);
        data = data.skip(skip).limit(limit);

////////////////////////////////////////////////////////////

// sort function
        if (sort) {
            const param = sort.split(",").join(" ");
            data = data.sort(param);
        } else {
            data = data.sort("name");
        }
        
///////////////////////////////////////////////


// get the data and send them
        data = await data
        res.send({products: data, nbHits: data.length})
        
    } catch (error) {

        next({
            err: error.message,
            msg: "error in the getAllData"

        })
    }
    
}







const getAllDataTesting = async (req, res, next)=>
{
    const data = await DataSc.find().skip(0).limit(5)
    res.send({ nbHits: data.length, products: data });
}

export
    {
        getAllData,
        getAllDataTesting
    }
    