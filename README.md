# DSA Subgraph 
### User Owned DSAs

Query the subgraph (Mainnet deployment): https://thegraph.com/hosted-service/subgraph/richa-iitr/dsamainnet?selected=playground<br> 
<!-- Pending Version: https://thegraph.com/hosted-service/subgraph/richa-iitr/dsamainnet?version=pending -->

Queries can be made for: 

**User**
- `address`: Address of the user, also the unique `id` identifying it.
- `DSAs`: Entity containing the information of the dsa
  - `accountID`: Account ID of the DSA
  - `address`: Address of the DSA
  - `version`: Version of the DSA
  - `creator`: Creator of the DSA
  - `owners`: The owners of this dsa (can be queried for their `id`, `DSAs`) of type: _User_

**DSA**
- `accountID`: Account ID of the DSA
- `address`: Address of the DSA
- `version`: Version of the DSA
- `creator`: Creator of the DSA
- `owners`: The owners of this dsa
  - `address`: Address of the user, also the unique `id` identifying it.
  - `DSAs`: Entity containing the information of the dsa (can be queried for the `accountID`, `address`, `version` etc.) of type: _DSA_

**Query Results**:

<pre>  {
  users(where: {address: "0x1d29756e8f7b091ce6c11a35980de79c7eda5d1f"}) {
    id
    address
    DSAs {
      id
      accountID
      version
      creator
      owners {
        id
      }
    }
  }
  dsas(where: {accountID: 18}) {
    id
    version
    accountID
    address
    owners {
      id
    }
  }
}
</pre>

![Screenshot from 2022-05-29 12-47-03](https://user-images.githubusercontent.com/76250660/170856927-afd3b419-ad6d-496f-aa1f-7b22c370e1e6.png)
![Screenshot from 2022-05-29 12-47-18](https://user-images.githubusercontent.com/76250660/170856931-6f2076dd-91ad-4efc-8b1a-3fb08c287d2c.png)


_Result from InstaList contract:_

![Screenshot from 2022-05-29 12-50-51](https://user-images.githubusercontent.com/76250660/170857135-7b34c680-e799-4ce0-a395-cb49c75f6d9a.png)
![Screenshot from 2022-05-29 12-52-06](https://user-images.githubusercontent.com/76250660/170857138-b4f55ee7-b14e-417d-9bf2-2eaf9724eca7.png)



