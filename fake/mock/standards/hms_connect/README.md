# MockUp Data Usage Guide
There are 2 data format
- ** json **  is baseon 
- ** nbjson**  is base on version 3 on smart fhire 
Recommended to use **nbjson**

## Usage guide of nbjson
** Organization ** has 0--m  relation to ** Encounter ** <br>
** Patient* * has 1--m relation to ** Encounter ** <br>
** Encounter ** has 1--m relation to [** Observeion(vital-sign)**, ** Observation(lab)**m ** Medication **, **MeicationRequest**]
