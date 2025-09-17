-- ===== LOCATIONS =====
insert into locations (id, name, address, type) values
                                                    (1,'Colombo Service Center','No.10, Galle Rd, Colombo 03','SERVICE_CENTER'),
                                                    (2,'Colombo Fuel Station','No.15, Duplication Rd, Colombo 04','FUEL_STATION');

-- ===== SERVICE TYPES =====
insert into service_types (id, code, label, base_price) values
                                                            (1,'OIL_CHANGE','Oil Change',4500.00),
                                                            (2,'FULL_SERVICE','Full Service',18000.00),
                                                            (3,'BRAKE_SERVICE','Brake Service',9500.00);

-- ===== USERS (password_hash is placeholder text for now) =====
insert into users (id,email,password_hash,full_name,phone,role,address,enabled) values
                                                                                    (1,'admin@afl.lk','password','Admin User','011-1234567','ADMIN','HQ, Colombo',true),
                                                                                    (2,'manager@afl.lk','password','Ops Manager','011-1002003','MANAGER','HQ, Colombo',true),
                                                                                    (3,'tech@afl.lk','password','Senior Technician','071-5550003','TECHNICIAN','Colombo 03',true),
                                                                                    (4,'finance@afl.lk','password','Finance Officer','011-1002005','FINANCE','HQ, Colombo',true),
                                                                                    (5,'staff@afl.lk','password','Front Desk','011-1002006','STAFF','Colombo 04',true),
                                                                                    (6,'customer1@example.com','password','Nipun Perera','077-1234567','CUSTOMER','Colombo 05',true),
                                                                                    (7,'customer2@example.com','password','Sajini Fernando','077-7654321','CUSTOMER','Dehiwala',true);

-- ===== VEHICLES =====
insert into vehicles (id, make, model, registration_no, owner_id) values
                                                                      (1,'Toyota','Aqua','CAA-1234',6),
                                                                      (2,'Nissan','X-Trail','KB-5678',7);

-- ===== BOOKINGS =====
-- SERVICE booking for customer 6 at location 1 (tomorrow 10–11)
insert into bookings
(id, customer_id, location_id, type, service_type_id, vehicle_id, fuel_type, liters_requested,
 start_time,               end_time,                 status)
values
    (1, 6, 1, 'SERVICE', 1, 1, null, null,
     '2025-09-18 10:00:00', '2025-09-18 11:00:00', 'CONFIRMED');

-- FUEL booking for customer 7 at location 2 (completed)
insert into bookings
(id, customer_id, location_id, type, service_type_id, vehicle_id, fuel_type, liters_requested,
 start_time,               end_time,               status)
values
    (2, 7, 2, 'FUEL', null, null, 'DIESEL_AUTO', 40.0,
     '2025-09-18 09:30:00', '2025-09-18 09:40:00', 'COMPLETED');

-- ===== JOBS (for the SERVICE booking) =====
insert into jobs (id, booking_id, technician_id, status, notes, assigned_at, completed_at) values
    (1, 1, 3, 'IN_PROGRESS', 'Oil change + inspection', now(), null);

-- ===== INVOICES =====
-- invoice for completed FUEL booking (liters * 420; tax 15%)
insert into invoices (id, created_by_id, booking_id, amount, tax, discount, total, paid, created_at) values
    (1, 4, 2, 16800.00, 2520.00, 0.00, 19320.00, true, now());

-- ===== FEEDBACK =====
insert into feedback (id, customer_id, booking_id, rating, comment, created_at) values
    (1, 7, 2, 5, 'Quick and smooth refuel. Thanks!', now());
