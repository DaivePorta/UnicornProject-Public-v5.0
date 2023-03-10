Public Class CCDetraccionCliente

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearDetraccionCliente(
      ByVal p_FVCDETRA_MONTO As String,
      ByVal p_FVCDETRA_DOC_CODE As String,
      ByVal p_FVCDETRA_NRO_OPE As String,
      ByVal p_FVCDETRA_FECHA_PAGO As String,
      ByVal p_FVCDETRA_USUA_ID As String,
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
      ByVal p_FVCDETRA_CLIENTE As String,
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
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVCDETRA_CLIENTE", p_FVCDETRA_CLIENTE, ParameterDirection.Input, 253))
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
    Public Function ListarClientesPorPagarDetracciones(ByVal empresa As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("SP_LISTAR_CLIENTES_POR_PAGAR_DETRACCIONES", CommandType.StoredProcedure)
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
    Public Function ListarDeudasDetraccionCliente(
     ByVal p_CTLG_CODE As String,
     ByVal p_PAGADO_IND As String,
     ByVal p_ESTADO_IND As String,
     ByVal p_PIDM As String, 'ID CLIENTE
     ByVal p_AUTODETRACC As String,
     Optional ByVal p_STBL As String = "", 'SUCURSAL
     Optional ByVal p_DESDE As String = "",
     Optional ByVal p_HASTA As String = ""
    ) As DataTable

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTAR_DEUDAS_DETRACC_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTODETRACC", p_AUTODETRACC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL", p_STBL, ParameterDirection.Input, 253))

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If

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
    Public Function ListarAmortizacionesDetracciones(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_CREAR_PAGOS_VARIOS_DETRACC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CLIE_IND", "P", ParameterDirection.Input, 253))
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

    Public Function PagarDetraccionesVariasCaja(ByVal p_detalle As String, ByVal p_caja_code As String,
                               ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                                 ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                               ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String, ByVal p_tipo_cambio As String,
                               ByVal p_ver_imagen As String,
                               Optional ByVal p_ind As String = "CAJ", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                                Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                                 Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "") As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_CREAR_PAGOS_VARIOS_DETRACC", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
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
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PagarDetraccionesVariasBanco(ByVal p_detalle As String, ByVal p_caja_code As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String, ByVal p_ORIGEN As String, ByVal p_ORIGEN_PIDM As String,
                               ByVal p_ORIGEN_CODIGO_BANCO As String, Optional ByVal p_adicional As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_codigo_apertura As String = "") As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_CREAR_PAGOS_VARIOS_DETRACC", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
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
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", p_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_PIDM", p_ORIGEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_CODIGO_BANCO", p_ORIGEN_CODIGO_BANCO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
