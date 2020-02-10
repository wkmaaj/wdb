# __BLOGGO.d__
#### _A **REST**ful blogging application_

## RESTful Routes
Following common convention, **C**reate, **R**ead, **U**pdate, and **D**elete (or *Destroy*) operations (oftentimes referred to simply as **CRUD**) can be implemented in a standard, programmable fashion and ultimately exposed to other applications via an API interface.

Name | Path | HTTP Verb | Mongoose Function
---- | ---- | --------- | ---------------
index | /blogs | GET | Bloggo.find()
new | /blogs/new | GET | N/A
create | /blogs | POST | Bloggo.create()
show | /blogs/:id | GET | Bloggo.findById()
edit | /blogs/:id/edit | GET | Bloggo.findById()
update | /blogs/:id | PUT | Bloggo.findByIdAndUpdate()
destroy | /blogs/:id | DELETE | Bloggo.findByIdAndRemove()
