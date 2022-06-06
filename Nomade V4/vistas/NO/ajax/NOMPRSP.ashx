<%@ WebHandler Language="VB" Class="NOMPRSP" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NOMPRSP : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda, p_TIPOD As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, CTLG_CODE, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, DEPEND_CODE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String
    
    
    
    Dim dt, dtc, dtaux As DataTable
    Dim dtp As DataTable
    Dim c As New Nomade.CO.CORegistroCompras("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim codempr As String
    Dim usua As String
    Dim p_area, p_seccion, p_proceso, p_usuario, p_detalle As String
    
    Dim tipoRequerimiento As String
    
    Dim P_ESTADOCABECE, p_REQUE, p_CLIENTE As String
    Dim p_SOLICITA As String
    Dim p_FECHA As String
    Dim p_PRIORIDAD As String
    Dim p_TIPOREQ As String
    Dim p_AREA1 As String
    Dim p_SECCION1 As String
    Dim p_PROCESO1 As String
    Dim p_ACTIVIDAD As String
    Dim p_GLOSA As String
    Dim p_USUARIO1 As String
    Dim p_CATALOGO As String
    Dim p_CODIGO As String
    Dim p_ESTABLECIMIENTO As String
    Dim p_CODEUSU As String
    Dim p_CODEDETALLE As String
    Dim TEXTI As String
    Dim SERVICIO As String
    Dim P_ESTADO As String
    Dim P_CABEUSUARIO As String
    
    Dim P_APR_DETALLE As String
    
    Dim P_CODE_DETA As String
    Dim P_GLOSA_DETA As String
    
    Dim P_SURCURSAL As String
    Dim P_FECHAINI As String
    Dim P_FECHAFIN As String
    Dim P_PRODUCTO As String
    Dim P_TOTAL As Decimal
    Dim P_TXT As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
      
        tipoRequerimiento = context.Request("tipoRequerimiento")
        opcion = context.Request("OPCION")
        code = context.Request("code")
        CTLG_CODE = context.Request("CTLG_CODE")
        
        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        DEPEND_CODE = context.Request("DEPEND_CODE")
      
        p_area = context.Request("p_area")
        p_seccion = context.Request("p_seccion")
        p_proceso = context.Request("p_proceso")
        p_usuario = context.Request("p_usuario")
        
        P_ESTADOCABECE = context.Request("P_ESTADOCABECE")
        p_SOLICITA = context.Request("p_SOLICITA")
        p_FECHA = context.Request("p_FECHA")
        p_PRIORIDAD = context.Request("p_PRIORIDAD")
        p_TIPOREQ = context.Request("p_TIPOREQ")
        p_AREA1 = context.Request("p_AREA1")
        p_SECCION1 = context.Request("p_SECCION1")
        p_PROCESO1 = context.Request("p_PROCESO1")
        p_ACTIVIDAD = context.Request("p_ACTIVIDAD")
        p_GLOSA = context.Request("p_GLOSA")
        p_USUARIO1 = context.Request("p_USUARIO1")
        p_CATALOGO = context.Request("p_CATALOGO")
        p_detalle = context.Request("p_detalle")
        p_ESTABLECIMIENTO = context.Request("p_ESTABLECIMIENTO")
        p_CODEUSU = context.Request("p_CODEUSU")
        p_CODEDETALLE = context.Request("p_CODEDETALLE")
        TEXTI = context.Request("TEXTI")
        SERVICIO = context.Request("SERVICIO")
        
        P_ESTADO = context.Request("P_ESTADO")
        
        P_CODE_DETA = context.Request("P_CODE_DETA")
        P_GLOSA_DETA = context.Request("P_GLOSA_DETA")
        
        P_APR_DETALLE = context.Request("P_APR_DETALLE")
        P_CABEUSUARIO = context.Request("P_CABEUSUARIO")
        
        p_TIPOD = context.Request("p_TIPOD")
        
        p_REQUE = context.Request("p_REQUE")
        p_CLIENTE = context.Request("p_CLIENTE")
        
        
        P_SURCURSAL = context.Request("P_SURCURSAL")
        P_FECHAINI = context.Request("P_FECHAINI")
        P_FECHAFIN = context.Request("P_FECHAFIN")
        P_PRODUCTO = context.Request("P_PRODUCTO")
        P_TOTAL = context.Request("P_TOTAL")
        P_TXT = context.Request("P_TXT")
        p_CODIGO = context.Request("p_CODIGO")
        
        
        Try
            Select Case opcion
               
                Case "1"
                    dt = c.LISTAR_DETALLE_APROBADO_SOLIC_PROD(CODIGO, P_ESTADO)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                           
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""DESCP"":""" & row("DESCP").ToString & """,")
                            resb.Append("""CANTIDAD_APROBADA"":""" & row("CANTIDAD_APROBADA").ToString & """,")
                            resb.Append("""CODE_PRODUCTO"":""" & row("CODE_PRODUCTO").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""UNIDAM"":""" & row("UNIDAM").ToString & """")
                            resb.Append("},")
                          
                           
                            
                            
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"
                    Dim Arr As Array
                    Arr = c.CREAR_PROCESA_SOLICITUD(p_CATALOGO, P_SURCURSAL, P_FECHAINI, P_FECHAFIN, p_GLOSA, P_PRODUCTO, P_TOTAL)
                    
                    c.CREAR_DETALLE_PRODUCION(P_TXT, Arr(1).ToString)
                  
                Case "8"
                    dt = c.LISTAR_CABECERA_SOLIC_PRODUCCIOM(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO)
                    GenerarTablaPro(dt)
                Case "9"
                    dt = c.LISTAR_CABECERA_SOLIC_PRODUCCIOM(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("ESTADO").ToString() = "APROBADO" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                                resb.Append("""CATALOGO"":""" & row("EMPRESA").ToString & """,")
                                resb.Append("""ESTABLECIMIENTO"":""" & row("ESTABLEC").ToString & """,")
                                resb.Append("""PRIORIDAD"":""" & row("PRIORIDAD").ToString & """,")
                                resb.Append("""TIPOREQUE"":""" & row("TIPORQUE").ToString & """,")
                                resb.Append("""IND_CLIENTE"":""" & row("IND_CLIENTE").ToString & """,")                    
                                resb.Append("""CLIENTE"":""" & row("CLIENTE").ToString & """,")
                                resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """")
                                resb.Append("},")
                            End If
                           
                            
                            
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3"
                    dt = c.LISTAR_PROCESAMIENTO_SOLICITUD(CTLG_CODE, p_ESTABLECIMIENTO, P_ESTADO, p_CODIGO )
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                           
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""CODE_PRODUCTO"":""" & row("CODE_PRODUCTO").ToString & """,")
                            resb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""FASE"":""" & row("FASE").ToString & """,")
                            resb.Append("""FECHAINI"":""" & row("FECHAINI").ToString & """,")
                            resb.Append("""FECHAFIN"":""" & row("FECHAFIN").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""UNIDMEDIDAD"":""" & row("UNIDMEDIDAD").ToString & """,")
                            resb.Append("""FECHAREGISTRO"":""" & row("FECHAREGISTRO").ToString & """")
                            resb.Append("},")
                          
                           
                            
                            
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
      
                Case "4"
                    dt = c.LISTAR_DETALLE_PROCESAMIENTO(p_CODIGO, P_ESTADO)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE_SOLICTUD"":""" & row("CODE_SOLICTUD").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                            resb.Append("""CODE_DETALLE_SOLIC"":""" & row("CODE_DETALLE_SOLIC").ToString & """,")
                            resb.Append("""CODE_DETALLE_ORDFLU"":""" & row("CODE_DETALLE_ORDFLU").ToString & """,")
                            resb.Append("""CODE_ORDFLU"":""" & row("CODE_ORDFLU").ToString & """,")
                            resb.Append("""FASE"":""" & row("FASE").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                 
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
    
    
   
        

 
    
  
    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
        
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            
            res += "<th>CODIGO</th>"
            res += "<th>USUARIO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>EMPRESA</th>"
            res += "<th>ESTABLECIMIENTO</th>"
            res += "<th>FECHA</th>"
            res += "<th>ESTADO</th>"
            
            
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If P_ESTADOCABECE = "A" Then
                    If dt.Rows(i)("ESTADO").ToString() = "APROBADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If
                
                If P_ESTADOCABECE = "PR" Then
                
                    If dt.Rows(i)("ESTADO").ToString() = "POR APROBAR" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If
                
                If P_ESTADOCABECE = "T" Then
                    If dt.Rows(i)("ESTADO").ToString() = "TERMINADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If
                
                If P_ESTADOCABECE = "E" Then
                    If dt.Rows(i)("ESTADO").ToString() = "EJECUCION" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If
                
                If P_ESTADOCABECE = "N" Then
                    If dt.Rows(i)("ESTADO").ToString() = "ANULADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If
                
                If P_ESTADOCABECE = "D" Then
                   
                    res += "<tr >"
                    res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                    res += "</tr>"
                
                End If
              
            Next
            res += "</tbody>"
           
           
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
 
    
    Public Function GenerarTablaProSinDatos() As String
        
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
       
        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"
       
        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class