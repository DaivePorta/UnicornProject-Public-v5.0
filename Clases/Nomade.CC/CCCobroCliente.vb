Imports System.Security.Cryptography

Public Class CCCobroCliente

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CobrarClienteCaja(ByVal p_detalle As String, ByVal p_ORIGEN As String,
                               ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                               ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                               ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String,
                               ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String,
                               Optional ByVal p_efectivo_recibido As String = "0", Optional ByVal p_efectivo_recibido_alterno As String = "0", Optional ByVal p_vuelto As String = "0", Optional ByVal p_vuelto_alterno As String = "0",
                               Optional ByVal p_adicional As String = "", Optional ByVal p_NOTACREDITO As String = "",
                               Optional ByVal p_ind As String = "CAJ", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                               Optional ByVal p_MONTO_TOTAL As String = "0") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand



            cmd = cn.GetNewCommand("PFB_CREAR_COBRO_CLIENTE", CommandType.StoredProcedure)

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
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_efectivo_recibido, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_efectivo_recibido_alterno, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_vuelto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_vuelto_alterno, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_MOV_BANC", String.Empty, ParameterDirection.Output, 253))

            Dim p_detail_count As Integer = p_detalle.Split("|").Length

            If p_detail_count > 10 Then
                cmd.CommandTimeout = 120 ' Set timeout to 120 seconds
            Else
                cmd.CommandTimeout = 30 ' Set timeout to 30 seconds
            End If

            cn.Ejecuta_parms(cmd)

            'msg = cmd.Parameters("@p_MENSAJE").Value

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CobrarClienteBanco(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String,
                               ByVal p_MONTO_TOTAL As String, ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String,
                               Optional ByVal p_efectivo_recibido As String = "0", Optional ByVal p_efectivo_recibido_alterno As String = "0", Optional ByVal p_vuelto As String = "0", Optional ByVal p_vuelto_alterno As String = "0",
                               Optional ByVal p_adicional As String = "",
                               Optional ByVal p_ORIGEN As String = "", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            'Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_COBRO_CLIENTE", CommandType.StoredProcedure)

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
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_efectivo_recibido, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_efectivo_recibido_alterno, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_vuelto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_vuelto_alterno, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_MOV_BANC", String.Empty, ParameterDirection.Output, 253))

            Dim p_detail_count As Integer = p_detalle.Split("|").Length

            If p_detail_count > 10 Then
                cmd.CommandTimeout = 120 ' Set timeout to 120 seconds
            Else
                cmd.CommandTimeout = 30 ' Set timeout to 30 seconds
            End If

            cn.Ejecuta_parms(cmd)

            'msg = cmd.Parameters("@p_MENSAJE").Value

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value
            msg(2) = cmd.Parameters("@p_CODIGO_MOV_BANC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CobrarClienteNotaCredito(ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                                             ByVal p_NOTACREDITO As String, ByVal p_tipo_cambio As String, Optional ByVal p_efectivo_recibido As String = "0",
                                             Optional ByVal p_efectivo_recibido_alterno As String = "0", Optional ByVal p_vuelto As String = "0",
                                             Optional ByVal p_vuelto_alterno As String = "0", Optional ByVal p_ver_imagen As String = "N") As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            'Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_COBRO_CLIENTE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", "0", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_efectivo_recibido, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_efectivo_recibido_alterno, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_vuelto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_vuelto_alterno, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_MOV_BANC", String.Empty, ParameterDirection.Output, 253))

            cn.Ejecuta_parms(cmd)

            'msg = cmd.Parameters("@p_MENSAJE").Value

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarClientesConDeuda(ByVal empresa As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CLIENTES_CON_DEUDA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", empresa, ParameterDirection.Input, 253))

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

    Public Function ListarCobroClientes(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CLIE_PIDM As String, ByVal p_DESDE As String, ByVal p_HASTA As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_COBROS_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

