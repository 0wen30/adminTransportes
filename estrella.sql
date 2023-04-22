CREATE TABLE `bancos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_proveedor` int(11) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `orden_mantenimiento` (
  `id` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estatus` varchar(255) DEFAULT NULL,
  `idunidad` int(11) DEFAULT NULL,
  `Mecanico` int(11) DEFAULT NULL,
  `Comentarios` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Estatus` tinyint(1) DEFAULT NULL,
  `idproveedor` int(11) DEFAULT NULL,
  `Forma_Pago` varchar(255) DEFAULT NULL,
  `idbancos` int(11) DEFAULT NULL,
  `idcompra` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `rel_productos_compras` (
  `id` int(11) NOT NULL,
  `idproducto` int(11) DEFAULT NULL,
  `idcompra` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `rel_productos_mtto` (
  `id` int(11) NOT NULL,
  `idproducto` int(11) DEFAULT NULL,
  `idmtto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `unidades` (
  `id` int(11) NOT NULL,
  `unidad` varchar(255) DEFAULT NULL,
  `Clase` varchar(255) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `TipoCombustible` varchar(255) DEFAULT NULL,
  `Marca` varchar(255) DEFAULT NULL,
  `Modelo` varchar(255) DEFAULT NULL,
  `Placas` varchar(255) DEFAULT NULL,
  `Capacidad` int(11) DEFAULT NULL,
  `Peso` int(11) DEFAULT NULL,
  `Kilometros` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

ALTER TABLE `bancos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proveedor` (`id_proveedor`);

ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `orden_mantenimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idunidad` (`idunidad`),
  ADD KEY `Mecanico` (`Mecanico`);

ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idproveedor` (`idproveedor`),
  ADD KEY `idcompra` (`idcompra`),
  ADD KEY `idbancos` (`idbancos`);

ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rel_productos_compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idcompra` (`idcompra`),
  ADD KEY `idproducto` (`idproducto`);

ALTER TABLE `rel_productos_mtto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idmtto` (`idmtto`),
  ADD KEY `idproducto` (`idproducto`);

ALTER TABLE `unidades`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `bancos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `orden_mantenimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `rel_productos_compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `rel_productos_mtto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `unidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

ALTER TABLE `orden_mantenimiento`
  ADD CONSTRAINT `orden_mantenimiento_ibfk_1` FOREIGN KEY (`idunidad`) REFERENCES `unidades` (`id`),
  ADD CONSTRAINT `orden_mantenimiento_ibfk_2` FOREIGN KEY (`Mecanico`) REFERENCES `empleados` (`id`);

ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idproveedor`) REFERENCES `proveedores` (`id`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idcompra`) REFERENCES `compras` (`id`),
  ADD CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`idbancos`) REFERENCES `bancos` (`id`);

ALTER TABLE `rel_productos_compras`
  ADD CONSTRAINT `rel_productos_compras_ibfk_1` FOREIGN KEY (`idcompra`) REFERENCES `compras` (`id`),
  ADD CONSTRAINT `rel_productos_compras_ibfk_2` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`id`);

ALTER TABLE `rel_productos_mtto`
  ADD CONSTRAINT `rel_productos_mtto_ibfk_1` FOREIGN KEY (`idmtto`) REFERENCES `orden_mantenimiento` (`id`),
  ADD CONSTRAINT `rel_productos_mtto_ibfk_2` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`id`);
COMMIT;