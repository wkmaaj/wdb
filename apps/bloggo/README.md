# __BLOGGO.d__
#### _A **REST**ful blogging application_

## RESTful Routes
Following common convention, **C**reate, **R**ead, **U**pdate, and **D**elete (or *Destroy*) operations (oftentimes referred to simply as **CRUD**) can be implemented in a standard, programmable fashion and ultimately exposed to other applications via an API interface.
----------------------------------------
  Name  |       Path      | HTTP Verb
----------------------------------------
index   |      /blogs     |    GET
new     |    /blogs/new   |    GET
create  |      /blogs     |   POST
show    |    /blogs/:id   |    GET
edit    | /blogs/:id/edit |    GET
update  |    /blogs/:id   |    PUT
destroy |    /blogs/:id   |  DELETE
----------------------------------------