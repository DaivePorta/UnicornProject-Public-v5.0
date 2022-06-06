<%@ WebHandler Language="VB" Class="NNMCNBE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMCNBE : Implements IHttpHandler
    Dim OPCION As String
    Dim p_CODE_RHCNPL, p_CODE_RHBENSO, p_USUA_ID As String

    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        
        p_CODE_RHCNPL = context.Request("p_CODE_RHCNPL")
        p_CODE_RHBENSO = context.Request("p_CODE_RHBENSO")
        p_USUA_ID = context.Request("p_USUA_ID")
        
        Try
            Select Case OPCION
                Case "1" '
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    Dim dtConceptos As New DataTable
                    Dim dtBeneficios As New DataTable
                    Dim dtRel As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtConceptos = NNPlanilla.Listar_Conceptos_Planilla("", "TOTAL", "A")
                    dtBeneficios = NNPlanilla.Listar_Beneficios_sociales("", "A")
                    dtRel = NNPlanilla.Listar_Rel_Conpl_Beneficio()
                    res = GenerarTablaMantenimiento(dtConceptos, dtBeneficios, dtRel)
                    
                Case "2" 'CREA RELACION CONCEPTO PLANILLA vs BENFICIOS
                    context.Response.ContentType = "text/html"
                    res = Crear_Rel_Conceptopl_beneficios(p_CODE_RHCNPL, p_CODE_RHBENSO, p_USUA_ID)
                Case "3" ' lista RELACION CONCEPTOS BENEFICIOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.Listar_Rel_Conpl_Beneficio()
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESC_RHCNPL"":" & """" & MiDataRow("DESC_RHCNPL").ToString & """,")
                            resb.Append("""DESC_RHBENSO"":" & """" & MiDataRow("DESC_RHBENSO").ToString & """,")
                            resb.Append("""DESC_VALOR"":" & """" & MiDataRow("DESC_VALOR").ToString & """")
  
                       
                        
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
        
        
        
    End Sub
 
    
    
    
    Public Function Crear_Rel_Conceptopl_beneficios(ByVal p_CODE_RHCNPL As String, ByVal p_CODE_RHBENSO As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Datos = NNPlanilla.Crear_REL_CONPPL_BENEFICIO(p_CODE_RHCNPL, p_CODE_RHBENSO, p_USUA_ID)
        NNPlanilla = Nothing
        Return Datos(0)
    
    End Function
    
    
    
    
    
    
    Public Function GenerarTablaMantenimiento(ByVal dtConceptos As DataTable, ByVal dtBeneficios As DataTable, ByVal dtRel As DataTable) As String
     
       
    
        resb.Clear()
        If dtBeneficios IsNot Nothing And dtConceptos IsNot Nothing Then
           Dim NumBeneficios = dtBeneficios.Rows.Count
                
          

            resb.Append("<table id='tblConceptos_Beneficios' class='display DTTT_selectable' border='1' style='width: 100%;'>")
            resb.Append("<thead  style='background-color: steelblue; color: aliceblue;'>")
            resb.Append("<tr>")
            resb.Append("<th style='text-align: center' rowspan='2'>CODIGO</th>") 'CODIGO 
            resb.Append("<th style='text-align: left' rowspan='2'>DESCRIPCION</th>") 'DESCRIPCION
            'For Each row In dtBeneficios.Rows
              
            resb.AppendFormat("<th style='text-align: center' colspan='{0}'>BENEFICIOS SOCIALES</th>", NumBeneficios) 'CABECERA BENEFICIOS     
              
                
            'Next
     
        
            resb.Append("<tr>")
            For Each row In dtBeneficios.Rows
      
              
           
                resb.AppendFormat("<th style='text-align: center'>{0}</th>", row("DESCRIPCION").ToString) 'HIJOS TRIBUTOS     
                
            Next
      
      
            resb.Append("</tr>")
            resb.Append("</thead>")
            resb.Append("<tbody>")
            'CONCEPTOS
            Dim bool As Boolean = False
            If dtConceptos IsNot Nothing Then
                For Each row In dtConceptos.Rows
                
                    If (row("COD_TIPO").ToString = "1") Then
                        resb.AppendFormat("<tr>")
                        resb.AppendFormat("<td>{0}</td>", row("CODIGO").ToString)
                        resb.AppendFormat("<td>{0}</td>", row("DESCRIPCION").ToString)
                        For Each rowBene In dtBeneficios.Rows
                            
                            If dtRel IsNot Nothing Then
                                
                           
                                For i As Integer = 0 To dtRel.Rows.Count - 1 'busco si existe codigos relacionados si no lo encuentra en todas iteraciones var false y agregaria un td normal al terminar el for
                                    If row("CODIGO").ToString = dtRel(i)("CODIGO_RHCNPL").ToString And rowBene("CODIGO").ToString = dtRel(i)("CODIGO_RHBENSO").ToString And dtRel(i)("VALOR").ToString = "S" Then
                                        resb.AppendFormat("<td style='text-align: center;background-color: lightskyblue'><input class='check'  checked='checked'  style='width:16px;height:16px' type='checkbox' codigos='{0},{1}'></td>", row("CODIGO").ToString, rowBene("CODIGO").ToString) 'checked='checked'   
                                        bool = True
                                        Exit For
                                    Else
                                        bool = False
                                    End If
                                Next
                            
                                If bool = False Then
                                    resb.AppendFormat("<td style='text-align: center'><input class='check'  style='width:16px;height:16px' type='checkbox' codigos='{0},{1}'></td>", row("CODIGO").ToString, rowBene("CODIGO").ToString) 'checked='checked'  
                                End If
                            Else
                                resb.AppendFormat("<td style='text-align: center'><input class='check'  style='width:16px;height:16px' type='checkbox' codigos='{0},{1}'></td>", row("CODIGO").ToString, rowBene("CODIGO").ToString) 'checked='checked'    
                            End If
                            
                           
                        Next
                        resb.Append("</tr>")
                    Else
                        resb.AppendFormat("<tr>")
                        resb.AppendFormat("<td><b>{0}</b></td>", row("CODIGO").ToString)
                        resb.AppendFormat("<td><b>{0}</b></td>", row("DESCRIPCION").ToString)
                        For Each rowBene In dtBeneficios.Rows
                           
                            resb.AppendFormat("<td style='text-align: center'>{0}</td>", "")
                            
                        Next
                  
                        resb.Append("</tr>")
                    End If
               
                Next
            End If
       
                'FIN  CONCEPTOS


                resb.Append("</tbody>")
                resb.Append("</table>")
           
            
            Else
            
                resb.Append("<center><div class='alert alert-error hide' style='display: block;width: 151px;height: 45px;text-align: center;border-radius: 7px!important;'> NO HAY DATOS!!!</div></center>")
            
            End If
     
            Return resb.ToString
    End Function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class