Please read this!

Title for this issue is a **`MANDATORY`** to follow this format

  [incident] Title of incident on j M Y H:i
  
eg:

  [incident] Bad Gateway Error on 08 Feb 2020 16:00
  
Please remove this notice.
------

# Incident Response Report Template

## Information Required

|Item                              | Details                     |
|----------------------------------|-----------------------------|
|**Reporter Name & Title**         | *Mandatory*                 |
|**Date and Time of Incident**     | *Mandatory*                 |
|**Company Name**                  | **Razer Merchant Services Sdn. Bhd.** |
|**Incident Location/URL**         | *Mandatory*                 |
|**Related Reference (if any)**    | *Mandatory*                 |
|**Breach of Applicable Law<br> and Regulations (if any)**| <add applicable law and regulation here> |
|**Incident Loss Amount (if any)** | <add incident amount if any>|
|**Incident Trigger point/contact**| *Mandatory*          |
|**Chronology of Incident**        | *Mandatory* <br> 1. <input here> <br> 2. <input here> <br> 3. <input here> |
|**Mitigation Action**<br>*(Immediate steps taken to restore<br> service, contain or reduce impact,<br> but may not eliminate it)* |<add mitigation action here>|
|**Remedial Action**<br>*(Long-term fix to restore<br>normal operations)* | <add remedial action>|
|**Root Cause Analysis**           | *Mandatory* <br> 1. Why: <input here> <br> 2. Why: <input here> <br> 3. Why: <input here> <br> 4. Why: <input here> <br> 5. Why: <input here> |
|**Preventive Action**<br>*(Eliminates root cause to<br>avoid recurrence)* | *Mandatory*                 |
|**Lesson Learnt**<br>*(Understanding why it happened)*| <add lesson learnt here>|
|**Action Plan**<br>*(Who is DRI and Timelines<br> to Implement Fixes<br> as stated in 'Actions' above)*| <add action plan here>|
|**Comments by<br>Fiuu Regulatory Compliance or<br>Risk Management (if any)**| <add comment by RC or RM> |
|**Escalate to<br>Fiuu Senior Management/<br>Risk & Compliance** | <add date> |
|**Escalate to<br>Senior Management of Razer Inc. <br> for Share Services/<br> Info Security related <br> incident Only** | <add date>|

*May refer this link to guide how to raise incident report https://git2u.merchant.razer.com/Backend/technical-documentation/-/wikis/Incident-Report-Guideline*

## Screenshot 



## Infra Team Checklist

*Network*  

- [ ] SSL Cert
- [ ] Domain Name (Akamain, CloudFlare)
- [ ] Load Balancer

*Server*

- [ ] Server status *(CPU, Memory, Storage, Network)*
- [ ] Glogger
- [ ] System
- [ ] Service

*Database*

- [ ] Database Status *(Replication Delay, CPU, Memory, database connection)*

## Programmer Team Checklist

- [ ] New Relic APM *(Response Time, Throughput, PHP, Database, Web External)*
- [ ] Queue Worker in Gearman Worker on Payment Server
- [ ] Latest Deployment
- [ ] Source Code or Application Log

## Ops Team Checklist

- [ ] Channel affected details *(How many channels affected, Online or Offline)*
- [ ] Announcement for unexpected downtime for channel affected and inform VIP merchant

/assign me  
/label ~"Type::Incident" ~"Type::documentation"