select 
injuries.name as injury, 
affectedAreas.name as affectedArea, 
state, 
incidents.id, 
causes.name as cause from incidents 
join injuries on incidents.injuryid = injuries.id
join affectedAreas on injuries.affectedareaid = affectedAreas.id
join causes on incidents.causeid = causes.id
where state = $1