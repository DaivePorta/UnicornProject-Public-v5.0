var NOLTDCO = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal, #cboTipoDcto').select2();
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    };

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };

    var cargarTipoDocumento = function () {
        var select = $('#cboTipoDcto');
        $.ajax({
            type: "post",
            url: 'vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=NRMX&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION_CORTA + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar tipo de documentos.');
            }
        });
    };

    var eventoControles = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });

        $('#cboTipoDcto').change(function () {
            $('#txtCodigoDoc, #txtDocumento').val(null);
            $('svg').html('');
        });

        $('#btnFiltrar').click(function () {
            $('#txtInfo').text('');
            $.ajax({
                type: "post",
                url: 'vistas/NO/ajax/NOLTDCO.ASHX?OPCION=DOCUMENTOS&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&TIPO_DCTO=' + $('#cboTipoDcto').val(),
                contenttype: "application/json",
                datatype: "json",
                async: false,
                success: function (data) {
                    $('#tblDocumentos').DataTable().destroy();
                    $('#tblDocumentos tbody').unbind('click');
                    if (data !== null) {
                        var tabla = $('#tblDocumentos').DataTable({
                            responsive: true,
                            data: data,
                            order: [[0, "desc"]],
                            columns: [
                                {
                                    data: "CODIGO",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: "NUM_DCTO",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: "EMISION",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: "RAZON_SOCIAL",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'left');
                                    }
                                }
                            ]
                        });
                        $('#tblDocumentos tbody').on('click', 'tr', function () {
                            var datos = tabla.row(this).data();
                            $('#txtCodigoDoc').val(datos.CODIGO);
                            $('#txtDocumento').val(datos.NUM_DCTO);
                            $('#divBuscarDoc').modal('hide');
                            $('#divImprimir svg').html('');
                        });
                    } else {
                        $('#tblDocumentos').DataTable({ responsive: true, data: [] });
                    }

                    $('#divBuscarDoc').modal('show');
                },
                error: function (msg) {
                    alertCustom('Error al cargar tipo de documentos.');
                }
            });
        });

        $('#btnVerFlujo').click(function () {
            if (vErrors(['txtDocumento'])) {
                $('#divImprimir').html('');

                Bloquear('divImprimir');

                $.ajax({
                    type: "post",
                    url: 'vistas/NO/ajax/NOLTDCO.ashx?OPCION=VER_FLUJO&TIPO_DCTO=' + $('#cboTipoDcto').val() + '&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&FACC_CODE=' + $('#txtCodigoDoc').val(),
                    contenttype: "application/json",
                    datatype: "json",
                    async: false,
                    success: function (data) {

                        var tree = CollapsibleTree("#divImprimir");
                        tree.init2(data);

                        Desbloquear('divImprimir');
                    },
                    error: function (msg) {
                        Desbloquear('divImprimir');
                    }
                });
               
            }
        });
    };

    var update = function (source) {
        $('#txtInfo').text('Click en un cuadro para navegar hacia el documento.');
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        nodes.forEach(function (d) { d.y = d.depth * 250; });

        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g").attr("class", "node")
            .attr("transform", function (d) { return "translate(" + rtl.y(source) + "," + rtl.x(source) + ")"; })
            .on("click", click);

        var rects = nodeEnter.append("rect")
            .attr("width", "10px").attr("height", "10px")
            .attr("x", function (d) { return -5; }).attr("y", function (d) { return -5; })
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; })
            .style("stroke", function (d) { return d.type; });

        nodeEnter.append("text")
            .attr("y", function (d) { return d.children || d._children ? 10 : -10; })
            .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", "1em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "start" : "end"; })
            .html(function (d) {
                return '<tspan x="-10" dy="1em">' + d.documento + '</tspan><tspan x="-10" dy="1em">' + d.numero + '</tspan>';
            })
            .style("fill-opacity", 1e-6);

        var nodeUpdate = node.transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + rtl.x(d) + "," + rtl.y(d) + ")"; });

        nodeUpdate.select("text").style("fill-opacity", 1);

        var nodeExit = node.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + rtl.x(source) + "," + rtl.y(source) + ")"; })
            .remove();

        nodeExit.select("text").style("fill-opacity", 1e-6);

        var link = svg.selectAll("path.link").data(links, function (d) { return d.target.id; });

        link.enter().insert("path", "g").attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.y, y: source.x };
                return diagonal({ source: o, target: o });
            });

        link.transition().duration(duration).attr("d", diagonal);

        link.exit().transition().duration(duration)
            .attr("d", function (d) {
                var o = { x: source.y, y: source.x };
                return diagonal({ source: o, target: o });
            }).remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x = rtl.y(d);
            d.y = rtl.x(d);
        });
    };

    var click = function (d) {
        window.open(d.url, '_blank');
    }

    return {
        init: function () {
            cargarEmpresas();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').val($('#ctl00_hddestablecimiento').val());
            cargarTipoDocumento();
            plugins();
            eventoControles();
        }
    }
}();


var click = function (d) {
    window.open(d.url, '_blank');
}

var CollapsibleTree = function (elt) {
    $('#txtInfo').text('Click en un cuadro para navegar hacia el documento.');

    var m = [20, 120, 20, 120],
        w = 500,
        h = parseFloat($("#divImprimir").css("width")),
        i = 0,
        root,
        root2;

    var tree = d3.layout.tree()
        //.size([h, w]);
        .size([w, h]);

    // var diagonal = d3.svg.diagonal()
    //     .projection(function(d) { return [d.y, d.x]; });

    var parentdiagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x + 20, -d.y - 20]; });

    var childdiagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x + 20, d.y + 20]; });

    var vis = d3.select(elt).append("svg:svg")
       .attr("width", h + m[1] + m[3])
       .attr("height", w + m[0] + m[2])
       .append("svg:g")
       // .attr("transform", "translate(" + m[3] + "," + m[0] + ")"); // left-right
       // .attr("transform", "translate(" + m[0] + "," + m[3] + ")"); // top-bottom
       .attr("transform", "translate(" + (h + m[1]) / 2 + ",0) rotate(90)");


    var that = {
        init: function (url) {
            var that = this;
            d3.json(url, function (json) {
                root = json;

                // root.x0 = h / 2;
                // root.y0 = 0;
                root.x0 = w / 2;
                root.y0 = h / 2;

                // Initialize the display to show a few nodes.
                root.children.forEach(that.toggleAll);
                // that.toggle(root.children[1]);
                // that.toggle(root.children[1].children[2]);
                // that.toggle(root.children[9]);
                // that.toggle(root.children[9].children[0]);

                // that.updateParents(root);
                // that.updateChildren(root);
                that.updateBoth(root);
            });
        },
        init2: function (json) {
            var that = this;
            root = json;

            root.x0 = w / 2;
            root.y0 = h / 2;
            //  root.children.forEach(that.toggleAll);
            that.updateBoth(root);
        },
        updateBoth: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 120; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); })

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
               .on("click", click);


            var rects = nodeEnter.append("rect")
             .attr("width", "10px").attr("height", "10px")
             //x abajo -x arriba
             //y derecha -y izquierda
             .attr("x", function (d) {
                 if (that.isParent(d)) {
                     //derecha
                     return 15;
                 } else {
                     if (d != root) {
                         //izquierda
                         return 15;
                     } else {
                         //root
                         return 15;
                     }
                 }
             })
             .attr("y", function (d) {
                 if (that.isParent(d)) {
                     //derecha
                     return -25;
                 } else {
                     if (d != root) {
                         //izquierda
                         return 15;
                     } else {
                         //root
                         return -5;
                     }
                 }
             })
             .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; })
             .style("stroke", function (d) { return d.type; });


            nodeEnter.append("svg:text")
                .attr("dy", ".35em")
                //.attr("y", function (d) { return d.children || d._children ? 10 : -10; })
                //.attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("text-anchor", function (d) {
                    if (that.isParent(d)) {
                        return "end";
                    } else {
                        return d.children || d._children ? "end" : "start";
                    }
                })
                .attr("transform", function (d) {
                    if (that.isParent(d)) {
                        //derecha
                        //+y izquieda
                        //+x abajo
                        return "translate(25,-55) rotate(-90)";
                    } else {
                        if (d != root) {
                            return "translate(25,35) rotate(-90)";
                        } else {
                            //+y izquieda
                            //+x abajo
                            return "translate(25,-25) rotate(-90)";
                        }
                    }
                })
                //.text(function (d) { return d.name; })
                 .html(function (d) {
                     return '<tspan x="-10" dy="1em">' + d.documento + '</tspan><tspan x="-10" dy="1em">' + d.numero + '</tspan><tspan x="-10" dy="1em">' + d.name + '</tspan>';
                 })
                .style("fill-opacity", 1e-6);


            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    if (that.isParent(d)) {
                        return "translate(" + d.x + "," + -d.y + ")";
                    } else {
                        return "translate(" + d.x + "," + d.y + ")";
                    }
                });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links_parents(nodes).concat(tree.links(nodes)), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    if (that.isParent(d.target)) {
                        return parentdiagonal({ source: o, target: o });
                    } else {
                        // return parentdiagonal({source: o, target: o});
                        return childdiagonal({ source: o, target: o });
                    }
                })
              .transition()
                .duration(duration)
                // .attr("d", parentdiagonal);
                .attr("d", function (d) {
                    if (that.isParent(d.target)) {
                        return parentdiagonal(d);
                    } else {
                        // return parentdiagonal(d);
                        return childdiagonal(d);
                    }
                })

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                // .attr("d", parentdiagonal);
                .attr("d", function (d) {
                    if (that.isParent(d.target)) {
                        return parentdiagonal(d);
                    } else {
                        return childdiagonal(d);
                    }
                })

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    // return parentdiagonal({source: o, target: o});
                    if (that.isParent(d.target)) {
                        return parentdiagonal({ source: o, target: o });
                    } else {
                        return childdiagonal({ source: o, target: o });
                    }
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        updateParents: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
                .on("click", function (d) { that.toggle(d); that.updateParents(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                .text(function (d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.x + "," + -d.y + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return parentdiagonal({ source: o, target: o });
                })
              .transition()
                .duration(duration)
                .attr("d", parentdiagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", parentdiagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return parentdiagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        updateChildren: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root2).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
                .on("click", function (d) { that.toggle(d); that.updateChildren(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                .text(function (d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return childdiagonal({ source: o, target: o });
                })
              .transition()
                .duration(duration)
                .attr("d", childdiagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", childdiagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return childdiagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },

        isParent: function (node) {
            if (node.parent && node.parent != root) {
                return this.isParent(node.parent);
            } else
                // if ( node.name == 'data' || node.name == 'scale' || node.name == 'util' ) {
                if (node.isparent) {
                    return true;
                } else {
                    return false;
                }
        },

        // Toggle children.
        toggle: function (d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            if (d.parents) {
                d._parents = d.parents;
                d.parents = null;
            } else {
                d.parents = d._parents;
                d._parents = null;
            }
        },
        toggleAll: function (d) {
            if (d.children) {
                d.children.forEach(that.toggleAll);
                that.toggle(d);
            }
            if (d.parents) {
                d.parents.forEach(that.toggleAll);
                that.toggle(d);
            }
        }

    }

    return that;
}