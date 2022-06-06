<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLTDCO.ascx.vb" Inherits="vistas_NO_NOLTDCO" %>
<style>
    .node {
        cursor: pointer;
    }

        .node rect {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 2px;
        }

        .node text {
            font: 13px sans-serif;
        }

    .link {
        fill: none;
        stroke: #aaa;
        stroke-width: 1.5px;
    }
</style>
<style>

#chart, #header, #footer {
  position: absolute;
  top: 0;
}

#header, #footer {
  z-index: 1;
  display: block;
  font-size: 36px;
  font-weight: 300;
  text-shadow: 0 1px 0 #fff;
}

#header.inverted, #footer.inverted {
  color: #fff;
  text-shadow: 0 1px 4px #000;
}

#header {
  top: 80px;
  left: 140px;
  width: 1000px;
}

#footer {
  top: 680px;
  right: 140px;
  text-align: right;
}

rect {
  fill: none;
  pointer-events: all;
}

pre {
  font-size: 18px;
}

line {
  stroke: #000;
  stroke-width: 1.5px;
}

.string, .regexp {
  color: #f39;
}

.keyword {
  color: #00c;
}

.comment {
  color: #777;
  font-style: oblique;
}

.number {
  color: #369;
}

.class, .special {
  color: #1181B8;
}

a:link, a:visited {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #666;
}

.hint {
  position: absolute;
  right: 0;
  width: 1280px;
  font-size: 12px;
  color: #999;
}

      .node circle {
        cursor: pointer;
        fill: #fff;
        stroke: steelblue;
        stroke-width: 1.5px;
      }

      .node text {
        font-size: 11px;
      }

      path.link {
        fill: none;
        stroke: #ccc;
        stroke-width: 1.5px;
      }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TRACKING DOCUMENTOS DE COMPRAS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divImprimir']);" style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">EMPRESA:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span11" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboSucursal">ESTABLECIMIENTO:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span11"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboTipoDcto">TIPO DCTO:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoDcto" class="span12"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label span12" style="text-align: right" for="txtDocumento">DOC:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="hidden" id="txtCodigoDoc" />
                                <input type="text" class="span8" id="txtDocumento" style="text-align: center" disabled="disabled" />
                                <button type="button" class="btn blue" id="btnFiltrar" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="span4" style="text-align: center">
                        <button class="btn blue" type="button" id="btnVerFlujo">VER FLUJO</button>
                    </div>
                </div>
                <div class="row-fluid" id="divImprimir" style="overflow-x:auto;">
                </div>
                <div class="row-fluid"><p style="text-align: right;margin-top:8px;" id="txtInfo"></p></div>
                <%--<div class="row-fluid"><p style="text-align: right" id="txtInfo"></p></div>--%>
            </div>
        </div>
    </div>
</div>

<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 53%" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarDoc_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <table class="table table-hover" id="tblDocumentos">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">NRO DOC</th>
                            <th style="text-align: center">FECHA EMISION</th>
                            <th>PROVEEDOR</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>
<%--<script src="../../recursos/plugins/d3-master/d3.js"></script>--%>
<script src="../../recursos/plugins/d3-master/d3.js"></script>
<script src="../../recursos/plugins/d3-master/d3.min.js"></script>
<script src="../../recursos/plugins/d3-master/d3.layout.js"></script>

<script type="text/javascript" src="../vistas/NO/js/NOLTDCO.js"></script>
<script>
    jQuery(document).ready(function () {
        NOLTDCO.init();
    });
</script>
