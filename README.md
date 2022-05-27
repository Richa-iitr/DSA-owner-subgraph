# DSA Subgraph 
### User Owned DSAs

Query the subgraph (Mainet deployment): <!--https://thegraph.com/hosted-service/subgraph/richa-iitr/dsamainnet?selected=playground--><br>
Pending Version: https://thegraph.com/hosted-service/subgraph/richa-iitr/dsamainnet?version=pending

Queries can be made for: 
- `address`: Address of the user, also the unique `id` identifying it.
- `count`: Count of dsas owned by the user
- `dsas`: Entity containing the information of the dsa
  - `accountID`: Account ID of the DSA
  - `address`: Address of the DSA
  - `version`: Version of the DSA
  - `owner`: The latest owner of the dsa
  - `creator`: Creator of the DSA
  - `isAuth`: Whether the owner given by `owner` is authorised for this dsa, _true_ if enabled else _false_.

**Query Results**:

<!-- <pre>{ 
  {
  users(where: {address: "0x1d29756e8f7b091ce6c11a35980de79c7eda5d1f"}) {
    id
    address
    count
    dsasOwned {
      id
      version
      accountID
      address
      creator
      isAuth
    }
  }
}</pre>


_Result from InstaList contract:_

![Screenshot from 2022-05-27 21-47-20](https://user-images.githubusercontent.com/76250660/170738775-ab092983-c6e7-442d-9398-519f1127fcc3.png)

<pre>{ 
  {
  users(where: {count_gte: 2}) {
    id
    address
    count
    dsasOwned(where: {isAuth: true}) {
      id
      version
      accountID
      address
      creator
      isAuth
    }
  }
}</pre>

 -->
