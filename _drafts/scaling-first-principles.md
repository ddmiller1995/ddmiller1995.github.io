
### Title: Scaling From First Principles - API-based microservices
### Summary




### Goals
Why do we care about scaling?
1. Reduce latency - improves CX
2. Prevent failure - improves availability, customer trust 
3. Keep up with business growth - systems that don't scale can bottleneck your business

### Scope
- Can we keep load balancing / VIP throughput out of scope? Start with assuming the connections have made it to your service? 
- How do we think about dependencies? 

### First Principles
1. Scaling = available resources / work
2. All resources are limited - scaling a system is the process of avoiding limits. This requires either increasing available resources (scaling out/up), or reducing the amount of work (optimizing). 
3. Systems have common types of resources. These are compute, memory, disk,  connections, and dependencies (I/O?). 
4. The units of work done by a system scale horizontally or vertically. 
	1. Horizontal: each individual unit of work costs the same, but there are more of them (ex: more customer requests)
	2. Vertical: each individual unit of work costs more, but there is a constant number of them (ex: a request processing a list of customers)




### Mental Models for API Load
Ideal would be a graphic, that shows requests coming to an API, where each request has a duration. Connections constrain how many requests can be processes at a time. Start with a single compute instance, show vertical scaling (increase connection count, CPU processing time), show horizontonal (increases # of instances). How latency impacts scaling bottlenecks. Propose that goal should be to be CPU or memory bound. 

A thought - for APIs, as you approach your resource limits, the symptom tends to be latency. Your resources are struggling to get the work done, making that work take longer. When you hit that limit, you see complete failure. Spillovers, timeouts, 5xx.

### Case Study
FOVS:
1. Interesting study in horizontal and vertical scaling (requests x offer volume)
2. Use of CPU profiling to remove bottlenecks
3. Application of caching, optimizing database queries, sneaky compute I/O bottlenecks like logging, etc)
4. Load testing
Could pull some good graphs



### Series Goal
If readers read all these posts, they should:
1. Have a set of first principles that can be applied to generally to solve scaling problems
2. Understand how these principles apply to common types of systems
3. Have detailed mental models about approach scaling problems for common systems
4. Learned specifics from case studies 

Series Structure:
1. Scaling First Principles
2. API Microservices
3. Queue-Based services
4. Dependency graphs
5. Caching