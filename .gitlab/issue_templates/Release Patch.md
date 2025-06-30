Please read this!

Title for this issue is a **`MANDATORY`** to follow this format

  [release] Deploy to production on j M Y H:i
  
eg:

  [release] Deploy to production on 28 Feb 2019 17:00
  
Please remove this notice.
------

### Deploy Schedule

+ **Date:** (Format: d/m/Y)
+ **Time:** (Format: h:i AM/PM)

List of the merge request (MR) to be deploy listed at merge request [RELEASE MERGE REQUEST TITLE](RELEASE MERGE REQUEST LINK)

#### Rollback Plan

(what you need to do in case deployment gone wrong, normally we revert to previously working setting)

#### Deployment team

+ VIP : 
+ Infra : 
+ Backend : 

#### Impact

##### CRITICAL CHECKLIST

================== MR ==================

* [ ] NO CHANGE ON DB CONNECTION
* [ ] NO CHANGE ON DB STRUCTURE
* [ ] NO CHANGE ON CORE/GLOBAL/SHARED/INCLUDE FILE
* [ ] NO CHANGE ON MERCHANT PROFILE CONFIGURATION
* [ ] NO CHANGE ON MERCHANT PROFILE READING SOURCE/METHOD
* [ ] NO CHANGE ON MDR SETTING/READING/CALCULATIONS
* [ ] NO CHANGE ON SETTLEMENT/FOREX CALCULATIONS

================== DEPLOY ==================

* [ ] NO IMPACT ON VIP MERCHANTS
* [ ] NO IMPACT ON PAYMENT SERVICES
* [ ] NO IMPACT ON ADMIN
* [ ] NO IMPACT ON API (REQUERY/VOID/REFUND)
* [ ] NO IMPACT ON MERCHANT PORTAL
* [ ] NO IMPACT ON USER FLOW/JOURNEY/UI/UX
* [ ] NO IMPACT ON SETTLEMENT/FOREX CALCULATION

================== MONITOR ==================

* [ ] OV SR & CAPTURED COUNT#
* [ ] CHANNEL SR & ERROR ANALYTICS
* [ ] BILLING DETAILS (NAME, EMAIL, MOBILE, CUR, AMT)
* [ ] ACTUAL AMT, FOREX, CUR
* [ ] TXN MDR/FEES (MERCHANT: _________ CHANNEL: _________ )
* [ ] TXN DETAILS (STAT_DESC, MEMO, TRACKING, HISTORY)

#### Check the following 10 minutes after deployment is done

* **VIP:**
  - [ ] Transaction Count (TC) / Success Count (SC) / Success Rate (SR) is normal (Try to compare with yesterday)
  - [ ] No related telegram alert
* **Infra:**
  - [ ] New Relic Infrastructure is healthy
  - [ ] AWS Cloudwatch Dashboard - RDS-Maria2022, ELB-Payment
* **Backend:**
  - [ ] Email alert - No SQL error

/assign me  
/label ~"Type::documentation" ~"Severity::4 - Critical"