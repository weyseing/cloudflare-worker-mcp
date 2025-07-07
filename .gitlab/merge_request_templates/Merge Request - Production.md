Please read this!

Title for this merge request is a **`MANDATORY`** to follow this format.
```YmdHis``` is the date and time release branch created. This title is same as branch name.

  Release Web YmdHis
  
eg:

  Release Web 202210111530
  
Please remove this notice.
------

See the closing issue Via Merge Request https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#close-an-issue

## What does this MR do?

This MR to deploy all the changes listed below to production server as scheduled on the release issue later.

### Improvement (~"Type::suggestion" and ~"Type::enhancement" label issue or merge request)

+ [MERGE REQUEST TITLE 1](MERGE REQUEST LINK 1)
+ [MERGE REQUEST TITLE 2](MERGE REQUEST LINK 2)
+ [MERGE REQUEST TITLE 3](MERGE REQUEST LINK 3)

### Fixing <small>(~"Type::bug" label issue or merge request)</small>

+ [MERGE REQUEST TITLE 1](MERGE REQUEST LINK 1)
+ [MERGE REQUEST TITLE 2](MERGE REQUEST LINK 2)
+ [MERGE REQUEST TITLE 3](MERGE REQUEST LINK 3)

### Customize (~"Type::customize"  label issue or merge request)

+ [MERGE REQUEST TITLE 1](MERGE REQUEST LINK 1)
+ [MERGE REQUEST TITLE 2](MERGE REQUEST LINK 2)
+ [MERGE REQUEST TITLE 3](MERGE REQUEST LINK 3)

## `Manual Step on server`

(Manual action need to be done directly on production server. E.g. Updating .env file or uploading certs)

#### Risk Analysis

Document: [INFORMATION RISK ASSESSMENT HANDBOOK](https://razermis.sharepoint.com/sites/RMSDocLib/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FRMSDocLib%2FShared%20Documents%2FRMS%20CENTRAL%20REPOSITORY%2FRMS%20IT%20%28%20RMS%2DIT%2Dxx%29%2FRMS%2DIT%2D006%20RMS%20IS%20Risk%20Management%2FRMS%2DIT%2D006%20RMS%20Information%20Risk%20Assessment%20Handbook%202023%201%2E6%20%28part%201%29%20%2D%20signed%2Epdf&parent=%2Fsites%2FRMSDocLib%2FShared%20Documents%2FRMS%20CENTRAL%20REPOSITORY%2FRMS%20IT%20%28%20RMS%2DIT%2Dxx%29%2FRMS%2DIT%2D006%20RMS%20IS%20Risk%20Management&p=true&ga=1)  
Formula: ```Risk Score = Asset Value X Impact X likelihood```

Asset Value: (Score value here - ```<Future Implementation>```)  
(Copy and paste all the value from MR)

Impact: (Score value here - ```<Future Implementation>```)   
(Copy and paste all the value from MR)

Likelihood: (Score value here - ```<Future Implementation>```)  
- [ ] New implementation
- [ ] Rare - May only occur in exceptional circumstances; simple process; no previous incidence of non-compliance
- [ ] Unlikely - Could occur at some time; less than 25% chance of occurring; non-complex process &/or existence of checks and balances
- [ ] Possible - Might occur at some time; 25 – 50% chance of occurring; previous audits/reports indicate non-compliance; complex process with extensive checks & balances; impacting factors outside control of organization
- [ ] Likely - Will probably occur in most circumstances; 50-75% chance of occurring; complex process with some checks & balances; impacting factors outside control of organization
- [ ] Almost certain - Can be expected to occur in most circumstances; more than 75% chance of occurring; complex process with minimal checks & balances; impacting factors outside control of organization

Risk Score: (Score value here - ```<Future Implementation>```)

#### Deployer Checklist [^1]

- [ ] Requested Merge is from **release branch** to **Master/Main branch**
- [ ] Merge Request label has been define properly (DO, Type, Priority & Severity)

#### Security & Compliance Checklist [^2]

- [ ] No Critical, High or Medium security vulnerability detected
- [ ] No other concern on security
- [ ] No other concern on compliance

----

[^1]: This checklist fill up by **`Deployer/Maintainer`**.
[^2]: This checklist fill up by **`Security & Compliance Teams`**.
