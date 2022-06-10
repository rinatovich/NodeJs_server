
let servers = [
    {id: '1', name: 'James', status: 'active'},
    {id: '2', name: 'Dany', status: 'blocked'},
    {id: '3', name: 'Lily', status: 'removed'},
    {id: '4', name: 'John', status: 'removed'},
    {id: '5', name: 'Luke', status: 'active'}
];
export const getAll = (req,res)=>{
    res.status(200).json(servers);
}

export const  create = (req,res)=>{
    const newUser ={
        id: Date.now().toString(),
        ...req.body
    };
    servers.push(newUser);
    res.status(201).json(newUser);
}

export const remove =(req,res)=>{
    console.log('ID', req.params.id);
    servers = servers.filter(s => s.id !== req.params.id);
    res.json({message: 'Server has been removed'});
}