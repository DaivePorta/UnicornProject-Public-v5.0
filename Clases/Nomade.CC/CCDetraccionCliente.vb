Public Class CCDetraccionCliente

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearDetraccionCliente(
      ByVal p_FVCDETRA_MONTO As String, _
      ByVal p_FVCDETRA_DOC_CODE As String, _
      ByVal p_FVCDETRA_NRO_OPE As String, _
      ByVal p_FVCDETRA_FECHA_PAGO As String, _
      ByVal p_FVCDETRA_USUA_ID As String, _
      ByVal p_FVCDETRA_CTLG_CODE As String
     ) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PVC_CREAR_DETRACCION_DCTO", CommandType.StoredProcedure)
            Dim cmd1 As IDbCommand

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_TIPO", "C", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_MONTO", p_FVCDETRA_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_DOC_CODE", p_FVCDETRA_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_NRO_OPE", p_FVCDETRA_NRO_OPE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_PAGADO_IND", "N", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_FECHA_PAGO", p_FVCDETRA_FECHA_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_USUA_ID", p_FVCDETRA_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_CTLG_CODE", p_FVCDETRA_CTLG_CODE, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CobrarDetraccionCliente(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_ORIGEN As String, ByVal p_ORIGEN_PIDM As String, ByVal p_ORIGEN_CODIGO_BANCO As String,
                                Optional ByVal p_adicional As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PVC_COBRAR_DETRACCION_DCTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", p_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_PIDM", p_ORIGEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_CODIGO_BANCO", p_ORIGEN_CODIGO_BANCO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarDetraccionCliente(
      ByVal p_FVCDETRA_CODE As String,
       ByVal p_FVCDETRA_DOC_CODE As String,
      ByVal p_FVCDETRA_PAGADO_IND As String,
      ByVal p_FVCDETRA_CTLG_CODE As String,
      ByVal p_FVCDETRA_AUTODETRA As String
     ) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PVC_LISTAR_DETRACCION_DCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_CODE", p_FVCDETRA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_TIPO", "C", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_DOC_CODE", p_FVCDETRA_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_PAGADO_IND", p_FVCDETRA_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_CTLG_CODE", p_FVCDETRA_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_AUTODETRA", p_FVCDETRA_AUTODETRA, ParameterDirection.Input, 253)) 'DPORTA 25/02/2021

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
