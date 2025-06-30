Please read this!

Title for this merge request is a **`MANDATORY`** to follow this format.

  [HOTFIX] .....
  
eg:

  [HOTFIX] Bug on MR https://........
  
Please remove this notice.
------

## Bug from release issue & merge request?

(Paste release issue and the merge request link here - Release that deploy the bugs and it merge request)

## Root cause?

(briefly describe the root cause of the bug)

## Test Cases

Test case not required as changes already in production.

### Relevant logs and/or screenshots

(Attach an evident the changes is working at production here. E.g: Chat history, page screenshots)

### Note for Deployer

- Environment Production :  
  Revert all the file in this changes at production

----

#### Risk Analysis

Document: [INFORMATION RISK ASSESSMENT HANDBOOK](https://razermis.sharepoint.com/sites/RMSDocLib/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FRMSDocLib%2FShared%20Documents%2FRMS%20CENTRAL%20REPOSITORY%2FRMS%20IT%20%28%20RMS%2DIT%2Dxx%29%2FRMS%2DIT%2D006%20RMS%20IS%20Risk%20Management%2FRMS%2DIT%2D006%20RMS%20Information%20Risk%20Assessment%20Handbook%202023%201%2E6%20%28part%201%29%20%2D%20signed%2Epdf&parent=%2Fsites%2FRMSDocLib%2FShared%20Documents%2FRMS%20CENTRAL%20REPOSITORY%2FRMS%20IT%20%28%20RMS%2DIT%2Dxx%29%2FRMS%2DIT%2D006%20RMS%20IS%20Risk%20Management&p=true&ga=1)  
Formula: ```Risk Score = Asset Value X Impact X likelihood```

Asset Value: (Score value here - ```<Future Implementation>```)  
(List all the web page, functions or features that involve in this MR.)

Impact: (Score value here - ```<Future Implementation>```)   
(List down all the impact when something wrong happen on this changes or when this changes got bug/error. Write no impact if it not.)  
+ Buyer:  
+ Merchant:  
+ Fiuu:  
+ Bank/Processor:  

Likelihood: (Score value here - ```<Future Implementation>```)  
(For the bug/incident type issue/merge request, mention here how frequent it happen. For others type issue/merge request, just write new implementation.)  
- [ ] Rare - May only occur in exceptional circumstances; simple process; no previous incidence of non-compliance
- [ ] Unlikely - Could occur at some time; less than 25% chance of occurring; non-complex process &/or existence of checks and balances
- [ ] Possible - Might occur at some time; 25 – 50% chance of occurring; previous audits/reports indicate non-compliance; complex process with extensive checks & balances; impacting factors outside control of organization
- [ ] Likely - Will probably occur in most circumstances; 50-75% chance of occurring; complex process with some checks & balances; impacting factors outside control of organization
- [ ] Almost certain - Can be expected to occur in most circumstances; more than 75% chance of occurring; complex process with minimal checks & balances; impacting factors outside control of organization

Risk Score: (Score value here - ```<Future Implementation>```)

#### CRITICAL CHECKLIST

* [ ] NO CHANGE ON DB CONNECTION
* [ ] NO CHANGE ON DB STRUCTURE
* [ ] NO CHANGE ON CORE/GLOBAL/SHARED/INCLUDE FILE
* [ ] NO CHANGE ON MERCHANT PROFILE CONFIGURATION
* [ ] NO CHANGE ON MERCHANT PROFILE READING SOURCE/METHOD
* [ ] NO CHANGE ON MDR SETTING/READING/CALCULATIONS
* [ ] NO CHANGE ON SETTLEMENT/FOREX CALCULATIONS
* [ ] NO CHANGE ON REFUND SETTING/READING/CALCULATIONS

#### Merge Request / Coder Checklist [^1]

- [ ] This changes is same as direct edit on production
- [ ] I have confirm the changes is working at production

#### Code Review Checklist [^2]

- [ ] Merge Request label has ~Type::bug, ~P0 & ~"Severity::5 - Urgent"
- [ ] Root cause been explain clearly in this MR
- [ ] Requested Merge is from **working branch** to **UAT branch**
- [ ] Evident been provided is correct

----

[^1]: This checklist fill up by **`Coder (Programmer/Developer)`**.
[^2]: This checklist fill up by **`Reviewer (Senior Developer/Team Lead)`**.
