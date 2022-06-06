<%@ WebHandler Language="VB" Class="NNMCOTP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMCOTP : Implements IHttpHandler
    Dim OPCION, CON_IND, ESTADO_IND, GRUPO_IND,
LISTA_IND, TIPLA_CODE, DEPEND_CODE, CONCEP_CODE, NRO_ORDEN, USUA_ID, GRUPO, ACTIVO,
ACCION As String
    
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim resArray As Array
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'sss
        OPCION = context.Request("OPCION")
        CON_IND = context.Request("CON_IND")
        GRUPO_IND = context.Request("GRUPO_IND")
        ESTADO_IND = context.Request("ESTADO_IND")        
        LISTA_IND = context.Request("LISTA_IND")
        TIPLA_CODE = context.Request("TIPLA_CODE")
        DEPEND_CODE = context.Request("DEPEND_CODE")
        CONCEP_CODE = context.Request("CONCEP_CODE")
        NRO_ORDEN = context.Request("NRO_ORDEN")
        USUA_ID = context.Request("USUA_ID")
        GRUPO = context.Request("GRUPO")
        ACCION = context.Request("ACCION")
        ACTIVO = context.Request("ACTIVO")
        
        
        Select Case OPCION.ToString()
            
            Case "1" 'Listar Grupo Conceptos
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New NOMADE.NN.NNPlanilla("BN")
                dt = pad.Listar_Conceptos_Planilla(GRUPO_IND, CON_IND, ESTADO_IND)
                If Not (dt Is Nothing) Then
                    dt = SortDataTableColumn(dt, "CODIGO", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_PLAME"" :" & """" & MiDataRow("CODIGO_PLAME").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                
            Case "2" 'Lista Conceptos por asignar
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pad As New Nomade.NN.NNPlanilla("BN")
                dt = pad.Listar_ConceptoxTipoPlanilla(LISTA_IND, TIPLA_CODE, DEPEND_CODE)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"":""" & row("CODE").ToString & """,")
                        resb.Append("""NRO"":""" & row("NRO").ToString & """,")
                        resb.Append("""CODE_PLAN"":""" & row("CODE_PLAN").ToString & """,")
                         resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("-")
                    resb.Replace("},-", "}")
                    resb.Append("]")
                End If
                res = resb.ToString()
         
                
              
                
            Case "3" 'Agrega Concepto a Tipo planilla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNPlanilla("Bn")
                                                                                                                                       
                resArray = e.Crear_ConceptosxTipoPla(TIPLA_CODE, CONCEP_CODE, ESTADO_IND, USUA_ID, GRUPO)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
                
            Case "4" 'Elimina Concepto x Tipo planilla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNPlanilla("Bn")
                                                                                                                                       
                resArray = e.Elimina_ConceptosxTipoPla(TIPLA_CODE, CONCEP_CODE, GRUPO)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            
            Case "5" 'Cambia Posicion
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNPlanilla("Bn")
                                                                                                                                       
                resArray = e.ActualizaPosicion_CxTPL(ACCION, CONCEP_CODE, NRO_ORDEN, TIPLA_CODE, GRUPO)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
             
            Case "6" 'Actualiza Estado Concepto x Tipo planilla
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NN.NNPlanilla("Bn")
                                                                                                                                       
                resArray = e.Actualiza_Estado_Concepto_Tipla(TIPLA_CODE, CONCEP_CODE, GRUPO, USUA_ID, ACTIVO)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "7"
                Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                Dim dtAdicional_NA As New DataTable
                Dim dtAdicional_AF As New DataTable
                Dim dtConcepFijo_AF As New DataTable
                Dim dtConcepFijo_NA As New DataTable
                Dim dtConcep_Descuentos As New DataTable
                
                dtAdicional_AF = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "AF")
                dtAdicional_NA = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "NA")
                dtConcepFijo_AF = NNPlanilla.Listar_ConceptoxTipoPlanilla("N", "0001", "AF", "NO")
                dtConcepFijo_NA = NNPlanilla.Listar_ConceptoxTipoPlanilla("N", "0001", "NA", "NO")
                dtConcep_Descuentos = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "DE", "")
                
                res = GenerarEstructuraPlanilla(dtAdicional_AF, dtAdicional_NA, dtConcepFijo_AF, dtConcepFijo_NA, dtConcep_Descuentos).ToString()
        End Select
        
        context.Response.Write(res)

    End Sub
 
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    
    Public Function GenerarEstructuraPlanilla(dtAdicional_AF As DataTable,
                                              dtAdicional_NA As DataTable,
                                              dtConcepFijo_AF As DataTable,
                                              dtConcepFijo_NA As DataTable,
                                              dtConcep_Descuentos As DataTable) As String

        res = ""
        resb.Clear()
        resb.AppendFormat("<table id='tblplanilla' border='1' style='max-width:8000px;width:5570px;border-collapse:collapse;border-color:black;' width:'5570px'>")
        resb.AppendFormat("<thead>")
        Dim cont_colums_total As Integer = 19
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;' align='center' bgcolor='#ffffff'>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>Cód Trab.</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2'  style='width:100px;'>Datos del Trabajador</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>Banco</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>D.N.I</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;' >Local</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:150px;'>Condiciones</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Dias Laborados</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Dias Efectivos</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Horas Efectivas Laboradas</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Horas Extras Acumuladas</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Días Faltados</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Minutos Tardanza</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Fecha de Cese</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> No Subsidios(Primeros 20 Dias)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> Subsidios(Apartir del 21 Dia)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:85px;'> Período Vacacional</th>")
        'remuneraciones afectos'
        Dim Ncolum_afectas_Adicionales As Integer = 0
        If Not dtAdicional_AF Is Nothing Then
            Ncolum_afectas_Adicionales = dtAdicional_AF.Rows.Count
        End If
        Dim Ncolum_afectas_No_adicionales As Integer = 0
        If Not dtConcepFijo_AF Is Nothing Then
            Ncolum_afectas_No_adicionales = dtConcepFijo_AF.Rows.Count
        End If
        
        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:350px;'>Remuneraciones Afectas</th>", Ncolum_afectas_Adicionales + Ncolum_afectas_No_adicionales + 1)
        
        'remuneraciones NO afectos'
        
        Dim Ncolum_Noafectas_Adicionales As Integer = 0
        If Not dtAdicional_NA Is Nothing Then
            Ncolum_Noafectas_Adicionales = dtAdicional_NA.Rows.Count
        End If
        Dim Ncolum_Noafectas_No_adicionales As Integer = 0
        If Not dtConcepFijo_NA Is Nothing Then
            Ncolum_Noafectas_No_adicionales = dtConcepFijo_NA.Rows.Count
        End If
        
        
        'descuentos 
        Dim Ncolum_Descuentos As Integer = 0
        If Not dtConcep_Descuentos Is Nothing Then
            Ncolum_Descuentos = dtConcep_Descuentos.Rows.Count
        End If
        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:450px;'>Remuneraciones No Afectas</th>", Ncolum_Noafectas_Adicionales + Ncolum_Noafectas_No_adicionales + 1)
        
        
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>TOTAL REMUNERACION</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>AFP / SNP</th>")
        resb.AppendFormat("<th colspan='{0}' style='width:100px;'>Descuentos al Trabajador</th>", Ncolum_Descuentos + 4)
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Total Descuento</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Sueldo Neto a Pagar</th>")
        resb.AppendFormat("<th style='width:85px;'>APORTACIONES DEL EMPLEADOR</th>")
       
        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;' align='center' bgcolor='#ffffff'>")
         
        resb.AppendFormat("<th colspan='4' style='width:80px;'>Fondo de Pensiones</th>")
        
        If Ncolum_Descuentos > 0 Then
            resb.AppendFormat("<th colspan='{0}' style='width:80px;'>Varios</th>", Ncolum_Descuentos)
        Else
            resb.AppendFormat("<th colspan='{0}' style='display:none'>Varios</th>", Ncolum_Descuentos)
        End If
       
        
        resb.AppendFormat("<th style='width:80px;'>Esssalud</th>")
        
        
        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;' align='center' bgcolor='#ffffff' >")
        
        resb.AppendFormat("<th style='width:200px;'>Apellidos</th>")
        resb.AppendFormat("<th style='width:200px;'>Nombres</th>")
        
        
        resb.AppendFormat("<th style='width:200px;'>EPS</th>")
        resb.AppendFormat("<th style='width:200px;'>Labor</th>")
        'resb.AppendFormat("<th style='width:200px;'>SCTR</th>")
        
        resb.AppendFormat("<th style='width:80px;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;'>Hasta</th>")
        
        resb.AppendFormat("<th style='width:80px;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;'>Hasta</th>")
        
        resb.AppendFormat("<th style='width:80px;'>Inicio</th>")
        resb.AppendFormat("<th style='width:80px;'>Fin</th>")
        
        
       
        'adicionales afectos
        If Not dtAdicional_AF Is Nothing Then
           
            For i As Integer = 0 To dtAdicional_AF.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#fde1af;'>{0}</th>", dtAdicional_AF(i)("DESCRIPCION").ToString)
            Next
       
        End If
     
        'fijos  afectos
        If Not dtConcepFijo_AF Is Nothing Then
            For i As Integer = 0 To dtConcepFijo_AF.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#fdafaf;'>{0}</th>", dtConcepFijo_AF(i)("DESCRIPCION").ToString)
            Next
       
        End If
        


        resb.AppendFormat("<th style='width:100px;'>Total Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        
        'adicionales no afectos
        If Not dtAdicional_NA Is Nothing Then
            For i As Integer = 0 To dtAdicional_NA.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#52ca70;'>{0}</th>", dtAdicional_NA(i)("DESCRIPCION").ToString)
            Next
      
        End If
        
        'fijos no afectos
        If Not dtConcepFijo_NA Is Nothing Then
            For i As Integer = 0 To dtConcepFijo_NA.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#afdafd;'>{0}</th>", dtConcepFijo_NA(i)("DESCRIPCION").ToString)
            Next
       
        End If
        
        
     
        resb.AppendFormat("<th style='width:100px;'>Total No Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        
        resb.AppendFormat("<th style='width:60px;'>S.N.P 13%</th>")
        resb.AppendFormat("<th style='width:60px;'>Aportac. AFP 10%</th>")
        resb.AppendFormat("<th style='width:60px;'>Comision AFP</th>")
        resb.AppendFormat("<th style='width:60px;'>Seguros AFP</th>")
        
        
        
        ' conceptos de descuentos agregados en lista
        If Not dtConcep_Descuentos Is Nothing Then
            For i As Integer = 0 To dtConcep_Descuentos.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#fdafed;'>{0}</th>", dtConcep_Descuentos(i)("DESCRIPCION").ToString)
            Next
       
        End If
        

     
        resb.AppendFormat("<th style='width:80px;'>De Regulares</th>")
        
        
        resb.AppendFormat("</tr>")
        
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody  >")
                                 
    
             
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        
       
       

        res = resb.ToString
        Return res
     
    End Function

End Class