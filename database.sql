CREATE TABLE `quotation_customers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(5) NOT NULL DEFAULT '',
  `first_name` varchar(50) NOT NULL DEFAULT '',
  `last_name` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `total_fly_hours_in_year` varchar(100) NOT NULL,
  `current_mode_of_travel` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
);

CREATE TABLE `quotations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `quotation_customer_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `leg_name` varchar(20) NOT NULL DEFAULT 'LEG 1',
  `aircraft_size` varchar(100) NOT NULL,
  `from_location` varchar(100) DEFAULT '',
  `to_location` varchar(100) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `pax_adult` int(3) NOT NULL DEFAULT '0',
  `pax_children` int(3) NOT NULL DEFAULT '0',
  `pax_infants` int(3) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
); 

CREATE TABLE `contact_us_queries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `subject` varchar(100) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
);